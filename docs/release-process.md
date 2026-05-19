# Release Process

Use this checklist whenever publishing a new public version of the ADLC
Manifesto.

## Version Update

1. Update the version in `manifesto.md`.
2. Update the current version and dates in `README.md`.
3. Add a new section to `CHANGELOG.md`.
4. Update the public changelog page in `site/changelog/index.html` when the
   website should show the release.
5. Update any visible version badges or release dates in the website.

## Validation

Run:

```sh
make check
```

Review the changed website pages before publishing.

## Commit, Tag, And Publish

Use an annotated Git tag for every public manifesto version.

```sh
git add .
git commit -m "Release ADLC Manifesto vX.Y"
git tag -a vX.Y -m "ADLC Manifesto vX.Y"
git push origin main
git push origin vX.Y
make publish
```

The repository tag uses lowercase `vX.Y`; the manifesto text uses uppercase
`VX.Y`.
