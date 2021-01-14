package looty
package poeapi

import looty.util.AjaxHelp

import scala.concurrent.{ExecutionContext, Future}
import looty.poeapi.PoeTypes.{Characters, Inventory, Leagues, StashTab}
import sun.security.krb5.Realm

import scala.scalajs.js


//////////////////////////////////////////////////////////////
// Created by bjackman @ 3/13/14 3:07 AM
//////////////////////////////////////////////////////////////


class PoeCacherDemo extends PoeCacher {
  //Demo version needs to just read the whole store off disk then have it in a data structure
  private var jsonCache: Option[js.Dynamic] = None
  private def loadJson(): Future[js.Dynamic] = {
    jsonCache.map(Future.successful).getOrElse {
      AjaxHelp.get[js.Dynamic]("/data/sample-items.json").map { x =>
        jsonCache = Some(x)
        x
      }
    }
  }
  private val account: String = "UnknownAccount!"


  def getAccountName: Future[String] = Future.successful("UnknownAccount!")
  override def setAccountNameOverride(accountName: Option[String]): Unit = {}
  override def getAccountNameOverride(): Option[String] = None

  def getChars(forceNetRefresh: Boolean): Future[PoeTypes.Characters] =
    loadJson().map(_.asJsDict[Characters](s"$account-characters"))

  def getInv(char: String, forceNetRefresh: Boolean): Future[Inventory] =
    loadJson().map(_.asJsDict[Inventory](s"$account-$char-inventory"))

  def getStashTabInfos(league: String, forceNetRefresh: Boolean): Future[PoeTypes.StashTabInfos] =
    loadJson().map(_.asJsDict[PoeTypes.StashTabInfos](s"$account-$league-stis"))

  def getStashTab(league: String, tabIdx: Int, forceNetRefresh: Boolean): Future[StashTab] =
    loadJson().map(_.asJsDict[StashTab](s"$account-$league-$tabIdx-stis"))

  def clearLeague(league: String): Future[Unit] = Future.successful(Unit)

  //missing ones to compile

  override def getAccountNameAndRealm: Future[(String, Option[String])] = {
    val f1 = getAccountName
    val f2 = getRealm
    f1.zip(f2)
  }

  override def getRealm: Future[Option[String]] = Future.successful(Some("DemoRealm"))

  override def getRealmOverride(): Option[String] = Option("DemoRealm")

  override def init(implicit ec: ExecutionContext): Future[_] = {
    Future.sequence(List(Leagues.init(this)))
  }

  override def setRealmOverride(realm: _root_.scala.Option[_root_.scala.Predef.String]): Unit = {}


}