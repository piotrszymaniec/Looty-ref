# quite few problems arised when trying to migrate to scala 1.13.8
Reasoning was as follows:  
1. I wanted to be able to parse pathofexile.com webpage for detailed accountName in format account#1234  because by default we know only "account" part of accountName
2. But to do it i needed dom function Html - which is not present in current version of scalajs.dom and ther is no 'dom.experimental.fetch' to download page - so i needed newer version
3. Yet it needs updated scalajs version like 1.7.0  and this scalajs version needs scala 13.8 at least
4. sbt-launch had to be updated to 1.7.0
5. then starting sbt-win.cmd threw quite some error beacouse ther is no sbt-idea, sbt-twirl or sbt-less version compatible with scala 2.13, only scala 2.12
6. resolver in sbt cant search for right places because following urls does not have required files
7. after 4hr of searching and detective and archeology work I droped the idea of updating

errors from sbt are as follows:  
```
PS C:\dev\github\looty> .\bin\sbt-win.cmd
[info] welcome to sbt 1.7.0 (Oracle Corporation Java 1.8.0_92)
[info] loading settings for project looty-build from build.sbt ...
[info] loading project definition from C:\dev\github\looty\project
[warn]
[warn]  Note: Some unresolved dependencies have extra attributes.  Check that these dependencies exist with the requested attributes.                                                                                                                                                                               
[warn]          com.github.mpeltonen:sbt-idea:1.7.0 (sbtVersion=1.0, scalaVersion=2.12)                                                                                                                                                                                                                             
[warn]          com.typesafe.sbt:sbt-less:1.0.9 (sbtVersion=1.0, scalaVersion=2.12)                                                                                                                                                                                                                                 
[warn]                                                                                                                                                                                                                                                                                                              
[warn]  Note: Unresolved dependencies path:                                                                                                                                                                                                                                                                         
[error] sbt.librarymanagement.ResolveException: Error downloading com.github.mpeltonen:sbt-idea;sbtVersion=1.0;scalaVersion=2.12:1.7.0
[error]   Not found
[error]   Not found
[error]   not found: https://repo1.maven.org/maven2/com/github/mpeltonen/sbt-idea_2.12_1.0/1.7.0/sbt-idea-1.7.0.pom
[error]   not found: C:\Users\Piotrek\.ivy2\localcom.github.mpeltonen\sbt-idea\scala_2.12\sbt_1.0\1.7.0\ivys\ivy.xml
[error]   not found: https://repo.scala-sbt.org/scalasbt/sbt-plugin-releases/com.github.mpeltonen/sbt-idea/scala_2.12/sbt_1.0/1.7.0/ivys/ivy.xml
[error]   not found: https://repo.typesafe.com/typesafe/ivy-releases/com.github.mpeltonen/sbt-idea/scala_2.12/sbt_1.0/1.7.0/ivys/ivy.xml
[error]   not found: https://repo.typesafe.com/typesafe/simple/maven-releases/com/github/mpeltonen/sbt-idea_2.12_1.0/1.7.0/sbt-idea-1.7.0.pom
[error] Error downloading com.typesafe.sbt:sbt-less;sbtVersion=1.0;scalaVersion=2.12:1.0.9
[error]   Not found
[error]   Not found
[error]   not found: https://repo1.maven.org/maven2/com/typesafe/sbt/sbt-less_2.12_1.0/1.0.9/sbt-less-1.0.9.pom
[error]   not found: C:\Users\Piotrek\.ivy2\localcom.typesafe.sbt\sbt-less\scala_2.12\sbt_1.0\1.0.9\ivys\ivy.xml
[error]   not found: https://repo.scala-sbt.org/scalasbt/sbt-plugin-releases/com.typesafe.sbt/sbt-less/scala_2.12/sbt_1.0/1.0.9/ivys/ivy.xml
[error]   not found: https://repo.typesafe.com/typesafe/ivy-releases/com.typesafe.sbt/sbt-less/scala_2.12/sbt_1.0/1.0.9/ivys/ivy.xml
[error]   not found: https://repo.typesafe.com/typesafe/simple/maven-releases/com/typesafe/sbt/sbt-less_2.12_1.0/1.0.9/sbt-less-1.0.9.pom
[error]         at lmcoursier.CoursierDependencyResolution.unresolvedWarningOrThrow(CoursierDependencyResolution.scala:345)
[error]         at lmcoursier.CoursierDependencyResolution.$anonfun$update$38(CoursierDependencyResolution.scala:314)
[error]         at scala.util.Either$LeftProjection.map(Either.scala:573)
[error]         at lmcoursier.CoursierDependencyResolution.update(CoursierDependencyResolution.scala:314)
[error]         at sbt.librarymanagement.DependencyResolution.update(DependencyResolution.scala:60)
[error]         at sbt.internal.LibraryManagement$.resolve$1(LibraryManagement.scala:59)
[error]         at sbt.internal.LibraryManagement$.$anonfun$cachedUpdate$12(LibraryManagement.scala:133)
[error]         at sbt.util.Tracked$.$anonfun$lastOutput$1(Tracked.scala:73)
[error]         at sbt.internal.LibraryManagement$.$anonfun$cachedUpdate$20(LibraryManagement.scala:146)
[error]         at scala.util.control.Exception$Catch.apply(Exception.scala:228)
[error]         at sbt.internal.LibraryManagement$.$anonfun$cachedUpdate$11(LibraryManagement.scala:146)
[error]         at sbt.internal.LibraryManagement$.$anonfun$cachedUpdate$11$adapted(LibraryManagement.scala:127)
[error]         at sbt.util.Tracked$.$anonfun$inputChangedW$1(Tracked.scala:219)
[error]         at sbt.internal.LibraryManagement$.cachedUpdate(LibraryManagement.scala:160)
[error]         at sbt.Classpaths$.$anonfun$updateTask0$1(Defaults.scala:3688)
[error]         at scala.Function1.$anonfun$compose$1(Function1.scala:49)
[error]         at sbt.internal.util.$tilde$greater.$anonfun$$u2219$1(TypeFunctions.scala:62)
[error]         at sbt.std.Transform$$anon$4.work(Transform.scala:68)
[error]         at sbt.Execute.$anonfun$submit$2(Execute.scala:282)
[error]         at sbt.internal.util.ErrorHandling$.wideConvert(ErrorHandling.scala:23)
[error]         at sbt.Execute.work(Execute.scala:291)
[error]         at sbt.Execute.$anonfun$submit$1(Execute.scala:282)
[error]         at sbt.ConcurrentRestrictions$$anon$4.$anonfun$submitValid$1(ConcurrentRestrictions.scala:265)
[error]         at sbt.CompletionService$$anon$2.call(CompletionService.scala:64)
[error]         at java.util.concurrent.FutureTask.run(Unknown Source)
[error]         at java.util.concurrent.Executors$RunnableAdapter.call(Unknown Source)
[error]         at java.util.concurrent.FutureTask.run(Unknown Source)
[error]         at java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)
[error]         at java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)
[error]         at java.lang.Thread.run(Unknown Source)
[error] (update) sbt.librarymanagement.ResolveException: Error downloading com.github.mpeltonen:sbt-idea;sbtVersion=1.0;scalaVersion=2.12:1.7.0
[error]   Not found
[error]   Not found
[error]   not found: https://repo1.maven.org/maven2/com/github/mpeltonen/sbt-idea_2.12_1.0/1.7.0/sbt-idea-1.7.0.pom
[error]   not found: C:\Users\Piotrek\.ivy2\localcom.github.mpeltonen\sbt-idea\scala_2.12\sbt_1.0\1.7.0\ivys\ivy.xml
[error]   not found: https://repo.scala-sbt.org/scalasbt/sbt-plugin-releases/com.github.mpeltonen/sbt-idea/scala_2.12/sbt_1.0/1.7.0/ivys/ivy.xml
[error]   not found: https://repo.typesafe.com/typesafe/ivy-releases/com.github.mpeltonen/sbt-idea/scala_2.12/sbt_1.0/1.7.0/ivys/ivy.xml
[error]   not found: https://repo.typesafe.com/typesafe/simple/maven-releases/com/github/mpeltonen/sbt-idea_2.12_1.0/1.7.0/sbt-idea-1.7.0.pom
[error] Error downloading com.typesafe.sbt:sbt-less;sbtVersion=1.0;scalaVersion=2.12:1.0.9
[error]   Not found
[error]   Not found
[error]   not found: https://repo1.maven.org/maven2/com/typesafe/sbt/sbt-less_2.12_1.0/1.0.9/sbt-less-1.0.9.pom
[error]   not found: C:\Users\Piotrek\.ivy2\localcom.typesafe.sbt\sbt-less\scala_2.12\sbt_1.0\1.0.9\ivys\ivy.xml
[error]   not found: https://repo.scala-sbt.org/scalasbt/sbt-plugin-releases/com.typesafe.sbt/sbt-less/scala_2.12/sbt_1.0/1.0.9/ivys/ivy.xml
[error]   not found: https://repo.typesafe.com/typesafe/ivy-releases/com.typesafe.sbt/sbt-less/scala_2.12/sbt_1.0/1.0.9/ivys/ivy.xml
[error]   not found: https://repo.typesafe.com/typesafe/simple/maven-releases/com/typesafe/sbt/sbt-less_2.12_1.0/1.0.9/sbt-less-1.0.9.pom
[warn] Project loading failed: (r)etry, (q)uit, (l)ast, or (i)gnore? (default: r)

```


### new approach

access pathofexile.com with request from javascript and give scalajs and scala value taken from specific place of webpage - namely from '<span class="profile-link"><a href="/account/view-profile/account-name-1234">account-name#1234</a></span>'
