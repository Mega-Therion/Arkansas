# Recommended live-data sources for Natural State

## Recommendation

Use the **USGS Water Data APIs v1** as the primary source for the dashboard’s live-flow experience. Start with Arkansas monitoring locations that publish continuous stream observations, and display **stream discharge** as the headline measure; show **gage height** and **water temperature** only at stations where those time series are available. USGS v1 exposes `monitoring-locations`, `latest-continuous`, and `continuous` collections. The location metadata includes identifiers, names, state/county, and site type; observation records include value, unit, measurement time, approval status, and qualifiers. That is a close fit for the existing flow chart and station list, while preserving station-specific availability and data-quality context. [1] [2] [3]

Target v1 rather than the legacy NWIS/WaterServices endpoints. USGS announced v1 on September 4, 2026, and its October 17, 2026 update says WaterServices is planned for decommissioning in early 2027. Continuous sensors are often sampled at 15-minute intervals, but USGS warns that transmission can be delayed at some locations. The interface should therefore say **“latest reported”** and show the observation timestamp—not imply that every station is exactly 15 minutes fresh. USGS API keys are available for higher rate limits; the official documentation does not present them as necessary for basic access. [2] [3]

For **discrete water-quality sampling**, use the **USGS Samples Data API** or the EPA/USGS/National Water Quality Monitoring Council **Water Quality Portal** as a separate, clearly dated data view. EPA describes the portal as serving more than 430 million results from over 1,500 federal, state, tribal, local, research, and public organizations. The Samples API explicitly says it does not provide real-time queries; its results are historical, metadata-rich samples. It should not be blended into the continuous-flow chart or labeled as live telemetry. [4] [5]

## Product implications

The current `96.8 / 100` “Watershed health” figure is a hard-coded composite, not a directly attributed observation. Do not replace it with a purported real score until its formula, component measures, time window, and source coverage are defined. Until then, replace it with a sourced observation or clearly mark it as an illustrative design value. Station counts and system-readiness percentages should also be calculated from returned records or labeled as examples, never left as fabricated live-state claims.

## Sources

[1]: https://api.waterdata.usgs.gov/docs/ "USGS Water Data APIs documentation"
[2]: https://waterdata.usgs.gov/blog/api-v1-release/ "USGS announcement of Water Data APIs v1"
[3]: https://api.waterdata.usgs.gov/ogcapi/v1/openapi "USGS Water Data APIs v1 OpenAPI documentation"
[4]: https://api.waterdata.usgs.gov/samples-data/docs "USGS Samples Data API Resource Center"
[5]: https://www.epa.gov/waterdata/water-quality-data-download "EPA Water Quality Data Download"
