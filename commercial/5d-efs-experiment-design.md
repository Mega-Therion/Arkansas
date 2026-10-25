# 5D-EFS stage 1: does this quartz write?

Question. A plate fused from natural quartz either takes a readable birefringent mark under one fixed laser recipe, or it does not, relative to a synthetic fused-silica plate written the same way.

Unit. One coupon. A coupon is one polished plate from one fusion lot (natural) or one catalog lot (synthetic). Voxels on a coupon are repeated measurements of that coupon. They are not replicates. Three coupons poured from one melt are still one melt.

Response. The fraction of scout sites on the coupon that show retardance above the unwritten background, read on a polarizing microscope. The reader is blinded to which feedstock the coupon came from.

Control. Synthetic fused silica, written in the same session, with the same recipe. Bought glass is the concurrent control. An unwritten region on each coupon is the background, not the control for feedstock.

Nuisance factors, and how they are handled.

- Write day and laser drift: blocked. Each day writes one natural coupon and one synthetic coupon.
- Position on the plate: scout sites are spread across the clear aperture, not parked on one edge.
- Polish and furnace: each natural coupon comes from its own fusion lot. If all three natural coupons come from one pot, the feedstock claim is not identified.

Design. Randomized block, block size 2, seed `20261025`. Schedule: `5d-efs-stage1-allocation.csv`. Three days, six coupons, three per arm. Run order inside a day is the row order of that block.

Recipe held fixed. Single polarized femtosecond beam, pulse count in the published low regime (about 20 pulses per site), energy at the avalanche threshold found by a scout on a scrap of that same coupon. Do not change pulse count or add a second beam in this stage. The tri-beam, the 1064 nm bias, and poling are not in this design.

Pass. On at least two of the three natural coupons, the marked fraction is in the same range as that day's synthetic coupon, and a blinded read recovers the written orientation. Fail. The synthetic coupons mark and the natural coupons do not. Then this deposit is out of the archive. One coupon is not a result.

Stage 2 does not start unless stage 1 passes. Stage 2 is a split-plot: feedstock stays the whole plot, and pulse count (low, high) is randomized across sites within the coupon. That second factor is for the write recipe, not for whether the deposit works.

Software that produced the schedule: NumPy 2.4.6, pandas 3.0.2, `randomization.block_randomization` from the experimental-design skill. pyDOE was not used. The skill's documented pin (NumPy 2.5.3, pandas 3.0.6, pydoe 1.5.0) was not the environment that ran.

Analysis, pre-specified. Compare natural versus synthetic within day. Do not pool voxels into a binomial n. The day is the block. Three days is the sample size.
