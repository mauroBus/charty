#!/bin/bash

#
# Usefull when you have a folder mapped to a branch and you are not interested
# in keep any history, just a folder mapped to a branch.
#

# master branch where the gh-pages folder is present
BRANCH=next
# name of the gh-pages folder inside your master branch
FOLDER=gh-pages
# destination branch
DST=$FOLDER
# current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD);

echo "Creating branch $DST using $BRANCH:$FOLDER as src";

if [[ $CURRENT_BRANCH == $DST ]]
then
  echo "Checkout to $BRANCH because the current branch will be recreated."
fi

git checkout $BRANCH
git branch -D $DST
git checkout --orphan $DST

if [[ $? -eq 0 ]]; then
  git rm -rf --quiet .
  git read-tree $BRANCH:$FOLDER/ &> /dev/null
  git checkout --quiet -- .
  git mv ./home/* ./
  git commit  --quiet -m"$FOLDER created."
  echo "$DST created and ready to be pushed."
fi
