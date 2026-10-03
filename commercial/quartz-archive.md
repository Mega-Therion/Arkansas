# The Quartz Archive — Mount Ida quartz, laser-written glass, and the Hall of Crystals

**Status:** concept plus engineering design study. Nothing built, no glass written, no Mount Ida
sample assayed. The full engineering spec is
[`quartz-5d-archival-spec.md`](quartz-5d-archival-spec.md); this page is the Arkansas-facing summary.
**Origin:** RY's 2026-09-18 notes and his 2026-09-20 working session; spec written 2026-09-20;
folded into this repo 2026-10-03.

## The idea

Most "storage" only keeps data by spending power forever: drives spin, get replaced every few
years, and get migrated to new formats. Their retention is a subscription. Laser-written glass
keeps data by physics instead. A femtosecond laser writes tiny structures inside the glass that
change how it handles polarized light. A polarized-light reader gets the bits back. There is
nothing to power and nothing to refresh, and the glass cannot be edited, only added to.

RY's turn in the 2026-09-20 session is what makes it a venture rather than a gadget:

> "we should really be trying to find a customer base that has actual stuff that needs to be
> preserved forever and not just stored."

## The Arkansas chain — corrected

```
Mount Ida quartz  →  crushed, cleaned, graded  →  melted into fused quartz (glass)
                  →  laser-written archive plates  →  the Hall of Crystals
```

The data cannot go into natural crystal points. Natural quartz bends polarized light on its own,
which drowns the written signal about 4,500 to 1 through a 2 cm block, and it cracks at 573 °C. The data goes into
**glass melted from the quartz**. The mine's role is feedstock (spec §2). The visitor story RY
sketched still works in this form. Someone digs a crystal out of the red clay in the morning, then
in the afternoon walks into a hall where the plates holding the records were melted from that same
mineral.

## Who it's for — RY's 2026-09-20 customer reframe

- **Records meant to be preserved, not stored:** founding documents, state historical records,
  national archives, public-domain literature and science. His examples were the Declaration of
  Independence, the Magna Carta and the Ellis Island records.
- **Amended documents work append-only.** A constitution plate gets each new amendment written as
  a new layer. Nothing already written is ever changed.
- **State monoliths.** Each state's records go on a plate displayed as a public, readable monument
  in that state, with a full set kept at Mount Ida.
- **Deep-time hazard markers,** which RY called legit: warnings about buried waste, written to
  outlast any language or institution.
- **Out of scope by RY's decision:** commercial and Hollywood IP archiving — "i think i may want to
  avoind the ip stuff and focus on the public interest type ventures."

## What's already real vs what's RY's own

**Already real** (sources at the bottom):

- **Founding documents in glass, 2016.** The University of Southampton's Optoelectronics Research
  Centre stored the Universal Declaration of Human Rights, Newton's *Opticks*, the Magna Carta and
  the King James Bible in 5D fused-silica storage. It presented the Magna Carta disc at Salisbury
  Cathedral in June 2016. Its published figures: up to 360 TB per disc, thermal stability to
  1,000 °C, and 13.8 billion years at 190 °C. RY's founding-documents idea has a direct precedent.
- **A space library, 2018.** The Arch Mission Foundation flew Southampton-made 5D quartz discs
  carrying Asimov's *Foundation* trilogy on the Tesla Roadster launched by Falcon Heavy.
- **A working deep-time archive, 2024.** Southampton stored the full human genome in a 5D crystal
  and placed it in the Memory of Mankind archive, in a salt mine at Hallstatt, Austria.
- **Companies already in the market.** SPhotonix, a 2024 Southampton spin-out, raised a $4.5M
  pre-seed to commercialize 5D crystals for data centers. Microsoft's Project Silica wrote Warner
  Bros.' 1978 *Superman* onto a 7.5 × 7.5 cm × 2 mm glass plate in 2019. In February 2026 it
  published a Nature paper extending the writing from fused silica to ordinary **borosilicate**
  glass, claiming "at least 10,000 years", with a multi-beam system that writes many voxels at once.
- **The timing trick in RY's three-laser idea is a published effect.** Fire a femtosecond pulse
  inside a nanosecond pulse's window and the fast pulse frees electrons, so the glass absorbs the
  longer pulse. This was published for fused silica in *Optics Letters* (2010), with the biggest
  effect when the fast pulse lands near the peak of the slow one. RY's "speeding bullet" caught
  inside the second laser's pulse is that effect. **The catch:** it was measured for ablation,
  which removes material, while data writing needs the opposite: controlled marks below the damage
  threshold. Whether it helps or hurts writing is exactly what spec Phases 1 and 3 test.

**RY's own.** These were not found in the sources checked for this page:

- the full three-tier scheme: an always-on low beam, a longer second pulse, and a fast third pulse
  caught inside it, with the beams on alternate faces of the block;
- the **Hall of Crystals** as a public site tied to the mine ("dig in the morning, see it in the
  afternoon"), plus the network of state monoliths;
- the Arkansas supply-chain tie, from local quartz to archive glass;
- the append-only constitution model.

## What the 2026 state of the art changes for Arkansas

- **The medium is no longer scarce.** Ordinary borosilicate glass now works for the 10,000-year
  class. Synthetic fused silica gets its purity from chemical precursors, not from a deposit. So
  Mount Ida purity is **not** the moat for the archive itself.
- **The billion-year class still needs fused silica.** Whether glass melted from natural Mount Ida
  quartz writes and ages like the high-grade fused silica in the published work has not been
  measured (spec open item Q-09). If only synthetic silica qualifies, the deposit doesn't matter
  for this product.
- **What Arkansas can own that isn't a commodity:** the archive institution, the public site, the
  civic records charter and the local-mineral story. The moat is the place and the public trust,
  not the raw material.
- **Mining impact is real.** The Ouachita National Forest lease fight in
  [`the-six-branches.md`](the-six-branches.md) is the cautionary case: a projected 825% sedimentation
  increase into Little Rock's drinking water. The "zero ecological scarring" line in the original
  notes is dropped.

## Numbers that hold up

From the spec, with its tiers: `[C]` cited, `[D]` derived by shown arithmetic, `[conj]` conjecture.

| Quantity | Value | Tier |
|---|---|---|
| Capacity, 10 × 10 × 2 cm slab, demonstrated parameters | 25 TB | `[D]` |
| Capacity, same slab, aggressive regime | ~300 TB | `[conj]` |
| Published lifetime | 13.8 billion years **at 190 °C** | `[C]` |
| Room-temperature lifetime | 10²⁰–10²¹ years, a ~20-order extrapolation | `[D]` |
| Write energy at the wall, one 300 TB slab | ~444 kWh | `[D]` |
| Break-even vs spinning disks at 1 W/TB | ~62 days | `[D]` |
| Write time, three beams at 10 MHz, one slab | ~154 days. Parallel-focus multiplexing is required, not optional | `[D]` |
| Capital cost per written TB | unknown, and likely the deciding commercial variable | open |

**Five figures from the original notes did not survive checking** (spec §9):

1. The written medium must be amorphous glass, not crystal. Crystal breaks at 573 °C, and 1,000 °C
   is a glass figure.
2. 360 TB per slab is an aggressive-regime target, not a demonstrated property.
3. 13.8 billion years is the 190 °C figure, not the room-temperature one.
4. A continuous 1064 nm bias beam passes straight through clear silica and deposits almost nothing.
5. Electrical poling lowers the ionization barrier by about 0.04–0.07 eV, not 1–2 eV.

## Next steps, in order

1. **Run the Mount Ida assay already priced in [`the-six-branches.md`](the-six-branches.md)**
   ($350–600, about two weeks). One trace-element assay answers the impurity side of both questions;
   the archive's inclusion and bubble limits need a separate optical inspection. The spec's provisional archive
   feedstock targets (Al ≤ 10 ppm, total ≤ 20 ppm) are design targets, not an industry standard, and
   they are looser than crucible grade (Al < 5.5 ppm, total < 12.37 ppm).
2. **Pick the glass class before spending on hardware.** Fused silica is the billion-year class;
   borosilicate is the 10,000-year class. If borosilicate is enough for the records in scope, Mount
   Ida feedstock is irrelevant to the medium.
3. **Don't start by building lasers.** Write stations already exist (Southampton/SPhotonix,
   Microsoft). The Arkansas-specific part is the institution, the site and the records charter.
4. Any in-house writing follows the spec's gated build sequence (§8): one slab, readback, depth
   scaling, bias-tier decision, ageing, throughput. The final gate is an independent party reading
   the slab using only the slab.

## Sources

- University of Southampton, "Eternal 5D data storage could record the history of humankind"
  (Feb 2016): https://www.southampton.ac.uk/news/2016/02/5d-data-storage-update.page
- Inside Hampshire, "5D storage preserves Magna Carta for ever" (2016):
  http://www.insidehampshire.co.uk/eternal-5d-storage-preserves-magna-carta-for-all-humanity/
- University of Southampton, "Human genome stored on 'everlasting' memory crystal" (Sep 2024):
  https://www.southampton.ac.uk/news/2024/09/human-genome-stored-on-everlasting-memory-crystal-.page
- Arch Mission Foundation: https://en.wikipedia.org/wiki/Arch_Mission_Foundation
- SPhotonix pre-seed: https://www.ico-optics.org/sphotonix-raises-4-5m-pre-seed-to-advance-5d-optical-memory/
- Microsoft, Project Silica and *Superman* (Nov 2019):
  https://news.microsoft.com/source/features/innovation/ignite-project-silica-superman/
- Microsoft Research, "Project Silica's advances in glass storage technology featured in Nature"
  (Feb 18, 2026): https://www.microsoft.com/en-us/research/blog/project-silicas-advances-in-glass-storage-technology/
- "Investigations of femtosecond–nanosecond dual-beam laser ablation of dielectrics," *Optics
  Letters* 35(14):2490 (2010): https://opg.optica.org/ol/abstract.cfm?uri=ol-35-14-2490
- Internal: the engineering spec ([`quartz-5d-archival-spec.md`](quartz-5d-archival-spec.md)); the
  2026-09-18 vault notes `data_center_vs_compute_center_and_quartz_holography.md` and
  `mount_ida_arkansas_quartz_corridor_and_hall_of_crystals.md` (Chyren second brain, `10_Notes/`).
