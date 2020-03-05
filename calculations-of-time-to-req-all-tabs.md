Data:

tab quant = 666
tab already loaded = x
tab left to load = 666 - x


4req per 1s
min req per tab = 1req
max req per tab = 2req 


45req per 60 s allowed:
44req in 11 s = 22 tabs loaded
44req in 11 s = 44 tabs loaded

Answer:

time to next req batch = 60 - ~11 = ~49s of wait time per 22 tabs

time to next req batch = 60 - ~11 = ~49s of wait time per 44 tabs

(666 - x) 44t *  60s   ~49s =  minimal wait time  = ~845s

(666 - x) 22t *  60s    ~49s =  maximal waite time  = ~1690

x how much we have PremiumTab -> (x / 44t) * 60s =?

x how much we have QuadTab -> (x / 22t) * 60s =?

time overal ? do we estimate avarage

~~more accurate~~
~~y items in quad tab costs n requests~~
~~y items in Premium tab costs n requests~~
number of requests is constant,  2 per quad tab, 1 everything else (10/01/2020)

but we dont know how much items is in future tabs we get ....
