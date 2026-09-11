# Workflows — meridian-globe-atlas

## W1 · Add waypoint from distill
1. Extract city, lat/lng, stage, date, exhibits.
2. Append seed.ts investigation waypoints.
3. Bump persist migrate if schema change.
4. typecheck + browser smoke.

## W2 · Publish + backup
1. Build / verify canvas.
2. Tarball source → artifacts.
3. Upload Drive Meridian folder.
4. Push GitHub meridian-drive-vault-atlas.
5. Optional infographic (PIL/ffmpeg or Imagine).

## W3 · Timeline replay
1. Sort waypoints by date.
2. POV interpolate along great-circle.
3. Ring pulse on active node.
