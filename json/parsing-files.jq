#[.[] | select(.frameType == 3)] | length
#[.[] | if .frameType == 3 then . else empty end] |  if .frameType == 3 then . else empty end

# 15790 raw 
#[.[]]

# 15740 without empty names and sorted by names
#[.[] | select(.name | length > 0) ] | . | sort_by(.name)

# cleaned from empty names, sorted and grouped by it (891) eliminating duplicates
#[.[] | select(.name | length > 0) ] | . | sort_by(.name) | group_by(.name)




#grouped by type creating new structure 
# {
#	type: " ",
#	names: [
#		" ",
#		" "
#	]
#}
#jq "[. | unique_by(.name)[] | { type: .extended.subcategories[0], name : .name }] | group_by(.type) | map({"type": .[0].type, "names": map(.name)})" out_striped_of_empty_names.json > ..\Uniques\partial_data_by_type.json


# grouped by type: extended.categories[0], except null type group (check what it is? - what group of items has null as extended.catefory (mayve)) , 
#jq "[.[] | select(.type != null)] | map({"type": .type,"count": map(. | length)[1], name: .name }) " partial_data_by_type.json








#[.stashes[].items |  unique_by(.name)[] | select(.frameType == 3)] | sort_by(.name) ] "pst (1).json" "pst (2).json" "pst (3).json" "pst (4).json" "pst (5).json" "pst (6).json" "pst (7).json" "pst (8).json" "pst (9).json" "pst (10).json" "pst (11).json" "pst (12).json" "pst (13).json" "pst (14).json" "pst (15).json" "pst (16).json" "pst (17).json" "pst (18).json" "pst (19).json" "pst (20).json" "pst (21).json" "pst (22).json" "pst (23).json" "pst (24).json" "pst (25).json" > x.json


