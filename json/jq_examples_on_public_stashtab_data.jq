#jq example commands on stashdata json file

| jq "[.[1] | {items: [.items[].typeLine]}]"
| jq "[.[1] | {items: [.items[].typeLine]}]"

| jq "[.[0] | {.stashes}]"

  | jq "[.stashes[].items[] | select( .frameType == 3) | .name]" > name_files.json
  //unique values
  | jq "[.stashes[].items[] | select( .frameType == 3) | .name] | unique" 

  jq "[.stashes[].items[] | select( .frameType == 3 and .name and .extended.category!=\"map\") | .name] | unique_by(name) | sort_by(name)"

  jq "[.stashes[].items[] | select( .frameType == 3 and .name and .properties.name!=\"Map Tier\") | .name] | unique_by(name) | sort_by(name)"

  jq "[.stashes[].items[] | select( .frameType == 3 and .name) | .name] | unique_by(name) | sort_by(name)"


  cat public_stash_!.json | jq ".next_change_id"
curl -o  public_stash_!.json https://www.pathofexile.com/api/public-stash-tabs?id=!
curl -o  public_stash_!.json https://www.pathofexile.com/api/public-stash-tabs?id=https://www.pathofexile.com/api/public-stash-tabs?id=796897660-810068021-773650540-873814293-834742085


cat public_stash_2312.json | jq "[.stashes[].items[] | select( .frameType == 3 and .name)] | unique_by(.name) | sort_by(.name)" > OUT\unqiues.json

jq "[.stashes[].items |  unique_by(.name)[] | select(.frameType == 3)] | length " "pst (1).json"

jq "[.stashes[].items |  unique_by(.name)[] | select(.frameType == 3)] | sort_by(.name)"


[.[] | select(.name | length > 0) ] | . | sort_by(.name) | group_by(.name)