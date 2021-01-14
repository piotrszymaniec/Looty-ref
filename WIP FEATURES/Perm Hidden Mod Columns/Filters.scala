package looty
package views.loot

import looty.model.{LootContainerId, ComputedItem}

import scala.scalajs.js


//////////////////////////////////////////////////////////////
// Copyright (c) 2014 Ben Jackman, Jeff Gomberg
// All Rights Reserved
// please contact ben@jackman.biz or jeff@cgtanalytics.com
// for licensing inquiries
// Created by bjackman @ 8/24/14 6:29 PM
//////////////////////////////////////////////////////////////


class Filters(containers: Containers, columns: Columns, setFilterFn: (ComputedItem => Boolean) => Unit) {

  def setContainer(id: LootContainerId, visible: Boolean) {
    if (visible) {
      containerFilters += id
    } else {
      containerFilters -= id
    }
  }

  def clearColumnFilters() {
    jq(".header-filter").`val`("")
    columnFilters = Map.empty[String, LootFilterColumn]
  }

  def clearContainerFilters() {
    containers.all.foreach(_.show())
  }

  def clear() {
    clearColumnFilters()
    clearContainerFilters()
  }
  var columnFilters    = Map.empty[String, LootFilterColumn]
  var containerFilters = Set.empty[LootContainerId]

  def addColFilter(filter: LootFilterColumn) {
    columnFilters += filter.col.id -> filter
  }

  def add(colId: String, text: String) {
    val col = columns.get(colId)
    if (text.trim.isEmpty) {
      columnFilters -= colId
    } else {
      val fil = LootFilterColumn.parse(text, col.get)
      columnFilters += colId -> fil
    }
  }

  def _hiddenColumnToggleFilter(filter: LootFilterColumn)  {
    //val fil = LootFilterColumn.parse(filter.col.headerFilterValue, filter.col)
    if (filter.text.trim.isEmpty)
      addColFilter(filter)
    else
      columnFilters -= filter.col.id
  }

  def hiddenColumnToggleFilter(colId: String, text:String) = {
    //if (text.trim.isEmpty) {  // jesli filter box jest pusty
      //usun ta kolumne z listy column do zastosowania filtra
    //wpp
      //stworz zachowanie kolumny wobec nalozonego stringu filtra
      //dodaj do filtrow funkcje mapujaca id columny na jej filtr

    val col = columns.get(colId)
    //if (col.get.hiddenColumn && !col.get.visible)
    if (text.trim.isEmpty)
      columnFilters -= colId
    else {
      val fil = LootFilterColumn.parse(text, col.get)
      columnFilters += colId -> fil
    }
//    LootFilterColumn.parse(col.get.headerFilterValue, col.get)

  }

//  def toggleFiltersForHiddenColumn(colId: String) { //hiddenColumns - those which wont be visible in grid but are visible to grid
//    val col = columns.get(colId)
//    if (col.get.visible) {
//      columnFilters -= colId
//    } else {
//      val fil = LootFilterColumn.parse(col.get.headerFilterValue, col.get)
//      columnFilters += colId -> fil
//    }
// val fil = LootFilterColumn.parse(col.get.headerFilterValue, col.get)
//  }

  def refresh() {
    def filter(item: ComputedItem): Boolean = {
      def columnsAllows = columnFilters.forall { case (colId, fil) =>
        fil.allows(item)
      }
      def containerAllows = containerFilters(item.containerId)

      columnsAllows && containerAllows
    }
    setFilterFn(filter)
  }
}