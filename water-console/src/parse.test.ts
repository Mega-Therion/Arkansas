import assert from "node:assert/strict";
import test from "node:test";
import {
  filterStations,
  numericOrMissing,
  parseHistory,
  parseInventory,
  siteFromHash,
  type Station,
} from "./parse.ts";

test("missing sentinel is not a discharge", () => {
  assert.equal(numericOrMissing("-999999"), null);
  assert.equal(numericOrMissing("12.5"), 12.5);
  assert.equal(numericOrMissing(""), null);
});

test("inventory keeps a station that has no coordinates", () => {
  const rows = parseInventory({
    value: {
      timeSeries: [
        {
          sourceInfo: {
            siteName: "NO COORDS",
            siteCode: [{ value: "07000001" }],
            siteProperty: [
              { name: "countyCd", value: "05111" },
              { name: "hucCd", value: "08020205" },
            ],
          },
          variable: { unit: { unitCode: "ft3/s" } },
          values: [
            {
              value: [
                {
                  value: "-999999",
                  dateTime: "2026-10-25T00:00:00-05:00",
                  qualifiers: ["P"],
                },
              ],
            },
          ],
        },
      ],
    },
  });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].lat, null);
  assert.equal(rows[0].valueCfs, null);
  assert.equal(rows[0].countyCd, "05111");
});

test("hash and filters", () => {
  assert.equal(siteFromHash("#site=07047932"), "07047932");
  assert.equal(siteFromHash("#site=nope"), null);
  const rows: Station[] = [
    {
      siteId: "11111111",
      name: "Alpha",
      lat: 1,
      lon: 2,
      valueCfs: 1,
      unit: "ft3/s",
      observedAt: null,
      qualifiers: [],
      tz: "CST",
      countyCd: "05001",
      hucCd: "11111111",
    },
    {
      siteId: "22222222",
      name: "Beta",
      lat: null,
      lon: null,
      valueCfs: null,
      unit: "ft3/s",
      observedAt: null,
      qualifiers: [],
      tz: "CST",
      countyCd: "05002",
      hucCd: "2222",
    },
  ];
  assert.equal(filterStations(rows, "2222", "", "").length, 1);
  assert.equal(filterStations(rows, "", "05002", "").length, 1);
  assert.equal(filterStations(rows, "", "", "1111").length, 1);
});

test("history drops the sentinel", () => {
  const points = parseHistory({
    value: {
      timeSeries: [
        {
          values: [
            {
              value: [
                { value: "3", dateTime: "a" },
                { value: "-999999", dateTime: "b" },
              ],
            },
          ],
        },
      ],
    },
  });
  assert.deepEqual(
    points.map((p) => p.valueCfs),
    [3, null],
  );
});
