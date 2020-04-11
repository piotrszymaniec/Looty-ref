## Issues

ComputedItemProps
  //hard code gem exp progress in lootview - there is no need to make another column view
  //  val GemProgress = pno("CurrentGemExperiance","currGemXp")(Gems)(_.Gem.Xp.current )
  //  GemProgress !?= "Gem current Xp "

ComputedItem
  
  //own category for Gem properties
  object Gem {
    object Xp {
//TODO how to get it from there?
//      val l = item.getXpProgress.getOrElse(0.0,0.0,0.0)
//      val current = l._2.asInstanceOf[Double]
//      val nextLevel = l._3.asInstanceOf[Double]
    }
  }


values imported ComputedItem cant get it to work... more reading about converting types from Option, to ..
and from Long to Double
