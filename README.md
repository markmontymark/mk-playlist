# mk-playlist

Make per-artist playlist files for my downloaded music

# Setup 

Make a file that contains all the files you want to split into per-artist files, something like:

## Getting the source

```
cd 
git clone git@github.com:markmontymark/mk-playlist
cd mk-playist
npm init
```

## Making playlist files

```
cd my/music/dir
find . -type f -name \*.mp3 > pls-all-files
node ~/mk-playlist/ pls-all-files
```

