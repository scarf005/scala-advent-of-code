"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7522],{2914:(a,n,e)=>{e.r(n),e.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>m});var t=e(7462),o=(e(7294),e(3905)),r=e(6340);const i={},l="Day 7: The Treachery of Whales",s={unversionedId:"puzzles/day7",id:"puzzles/day7",title:"Day 7: The Treachery of Whales",description:"by @tgodzik",source:"@site/target/mdoc/puzzles/day7.md",sourceDirName:"puzzles",slug:"/puzzles/day7",permalink:"/scala-advent-of-code/puzzles/day7",draft:!1,editUrl:"https://github.com/scalacenter/scala-advent-of-code/edit/website/docs/puzzles/day7.md",tags:[],version:"current",frontMatter:{},sidebar:"adventOfCodeSidebar",previous:{title:"Day 6: Lanternfish",permalink:"/scala-advent-of-code/puzzles/day6"},next:{title:"Day 8: Seven Segment Search",permalink:"/scala-advent-of-code/puzzles/day8"}},c={},m=[{value:"Puzzle description",id:"puzzle-description",level:2},{value:"Part 1: Fast and craby",id:"part-1-fast-and-craby",level:2},{value:"Final code for Part 1",id:"final-code-for-part-1",level:3},{value:"Part 2: Craby engineering",id:"part-2-craby-engineering",level:2},{value:"Final code for part 2",id:"final-code-for-part-2",level:2},{value:"Run it locally",id:"run-it-locally",level:2},{value:"Solutions from the community",id:"solutions-from-the-community",level:2}],u={toc:m};function h(a){let{components:n,...e}=a;return(0,o.kt)("wrapper",(0,t.Z)({},u,e,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"day-7-the-treachery-of-whales"},"Day 7: The Treachery of Whales"),(0,o.kt)("p",null,"by ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/tgodzik"},"@tgodzik")),(0,o.kt)("h2",{id:"puzzle-description"},"Puzzle description"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://adventofcode.com/2021/day/7"},"https://adventofcode.com/2021/day/7")),(0,o.kt)("h2",{id:"part-1-fast-and-craby"},"Part 1: Fast and craby"),(0,o.kt)("p",null,"The whale is trying to swallow our submarine! Fortunately, there is a small\narmada of crabs, let's call it a crabmada, in their tiny crabmarines that want\nto help us out! However, the crabs are not particularly efficient and will need\nour help, we need to align all their little crabmarines using the least fuel\npossible, so that they can blow a hole in the ocean floor."),(0,o.kt)("p",null,"Firstly, let's start with modeling a single crabmarine:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"case class Crabmarine(horizontal: Int):\n  def moveForward(): Crabmarine = this.copy(horizontal = horizontal + 1)\n  def moveBackward(): Crabmarine = this.copy(horizontal = horizontal - 1)\n")),(0,o.kt)("p",null,"The crabmarine can move in two directions, forward and backwards."),(0,o.kt)("p",null,"Let's translate our input into a list of ",(0,o.kt)("inlineCode",{parentName:"p"},"Crabmarine"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'val horizontalPositions = input.split(",").map(_.toInt).toList\nval crabmarines = horizontalPositions.map(horizontal => Crabmarine(horizontal))\n')),(0,o.kt)("p",null,"A list of crabmarines can form a crabmada:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"case class Crabmada(crabmarines: List[Crabmarine]):\n  // we don't want an empty list here!\n  require(crabmarines.nonEmpty)\n\n  def align() = ???\n")),(0,o.kt)("p",null,"and it can have a method for aliging all its crabs."),(0,o.kt)("p",null,"Now the tricky part, how can we figure out the horizontal position that\nminimizes the amount of fuel the crabs will use? We have only two possible\nmoves, forwards and backwards, and we know for sure that all the edge crabs will\nneed to move. Let's model our solution as one of two moves:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"moving all the edge crabmarines with the current maximum horizontal position\nbackwards"),(0,o.kt)("li",{parentName:"ul"},"moving all the edge crabmarines with the current minimal horizontal position\nforwards")),(0,o.kt)("p",null,"In each interation we can move the crabmarines that use less fuel, which\nguarantees us that the result will be minimal at the end when all the crabs\nreach the same horizontal position."),(0,o.kt)("p",null,"This can take a form of a recursive function:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"  @tailrec\n  final def align(\n      situation: List[Crabmarine] = crabmarines,\n      fuelCost: Int = 0\n  ): Int =\n    val allTheSame = situation.forall(_.horizontal == situation.head.horizontal)\n    if allTheSame then fuelCost\n    else\n      val maxHorizontal = situation.maxBy(_.horizontal)\n      val minHorizontal = situation.minBy(_.horizontal)\n\n      val fuelCostForMax = situation.count {\n         crabmarine => crabmarine.horizontal == maxHorizontal.horizontal\n      }\n      val fuelCostForMin = situation.count {\n        crabmarine => crabmarine.horizontal == minHorizontal.horizontal\n      }\n      if fuelCostForMax < fuelCostForMin then\n        val updated = situation.map { crabmarine =>\n          if crabmarine.horizontal == maxHorizontal.horizontal then\n            crabmarine.moveBackward()\n          else crabmarine\n        }\n        align(updated, fuelCost + fuelCostForMax)\n      else\n        val updated = situation.map { crabmarine =>\n          if crabmarine.horizontal == minHorizontal.horizontal then\n            crabmarine.moveForward()\n          else crabmarine\n        }\n        align(updated, fuelCost + fuelCostForMin)\n")),(0,o.kt)("p",null,"First we check if all the crabmarines already align. If not we need to check\nwhat is the cost of moving all the crabs on each of the edges. We move all the\nones on the edge that will use less fuel (less crabs to move). Then we\ninvoke the function again with the updated positions of the crabmarines."),(0,o.kt)("p",null,"Additionally, we use here a ",(0,o.kt)("inlineCode",{parentName:"p"},"@tailrec")," annotation, which makes sure that our\nfunction can be translated by the compiler into an iterative solution without\never exceeding the maximum stack."),(0,o.kt)("h3",{id:"final-code-for-part-1"},"Final code for Part 1"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'\ncase class Crabmarine(horizontal: Int):\n  def moveForward(): Crabmarine = this.copy(horizontal = horizontal + 1)\n  def moveBackward(): Crabmarine = this.copy(horizontal = horizontal - 1)\n\ncase class Crabmada(crabmarines: List[Crabmarine]):\n  // we don\'t want an empty list here!\n  require(crabmarines.nonEmpty)\n\n  @tailrec\n  final def align(\n      situation: List[Crabmarine] = crabmarines,\n      fuelCost: Int = 0\n  ): Int =\n    val allTheSame = situation.forall(_.horizontal == situation.head.horizontal)\n    if allTheSame then fuelCost\n    else\n      val maxHorizontal = situation.maxBy(_.horizontal)\n      val minHorizontal = situation.minBy(_.horizontal)\n\n      val fuelCostForMax = situation.count {\n         crabmarine => crabmarine.horizontal == maxHorizontal.horizontal\n      }\n      val fuelCostForMin = situation.count {\n        crabmarine => crabmarine.horizontal == minHorizontal.horizontal\n      }\n      if fuelCostForMax < fuelCostForMin then\n        val updated = situation.map { crabmarine =>\n          if crabmarine.horizontal == maxHorizontal.horizontal then\n            crabmarine.moveBackward()\n          else crabmarine\n        }\n        align(updated, fuelCost + fuelCostForMax)\n      else\n        val updated = situation.map { crabmarine =>\n          if crabmarine.horizontal == minHorizontal.horizontal then\n            crabmarine.moveForward()\n          else crabmarine\n        }\n        align(updated, fuelCost + fuelCostForMin)\n\ndef part1(input: String): Int =\n  val horizontalPositions = input.split(",").map(_.toInt).toList\n  val crabmarines =\n    horizontalPositions.map(horizontal => ConstantCostCrabmarine(horizontal))\n  Crabmada(crabmarines).align()\n\n')),(0,o.kt)(r.Z,{puzzle:"day7-part1",year:"2021",mdxType:"Solver"}),(0,o.kt)("h2",{id:"part-2-craby-engineering"},"Part 2: Craby engineering"),(0,o.kt)("p",null,"Turns out we were severily mistaken and the crabmarines use more fuel the\nfurther they move. That means our solution will not help out our little sea\nfriends. We need to modify the solution to take that into account."),(0,o.kt)("p",null,"Let's try to model the new and old submarines using a new class hierarchy, we\nwill add the current fuel cost for the new model of the submarine we are simulating:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"sealed trait Crabmarine:\n  def moveForward(): Crabmarine\n  def moveBackward(): Crabmarine\n  def horizontal: Int\n  def fuelCost: Int\n\ncase class ConstantCostCrabmarine(horizontal: Int) extends Crabmarine:\n  def fuelCost: Int = 1\n  def moveForward(): Crabmarine = this.copy(horizontal = horizontal + 1)\n  def moveBackward(): Crabmarine = this.copy(horizontal = horizontal - 1)\n\ncase class IncreasingCostCrabmarine(horizontal: Int, fuelCost: Int = 1)\n    extends Crabmarine:\n  def moveForward() =\n    this.copy(horizontal = horizontal + 1, fuelCost = fuelCost + 1)\n  def moveBackward() =\n    this.copy(horizontal = horizontal - 1, fuelCost = fuelCost + 1)\n")),(0,o.kt)("p",null,"We define a new trait ",(0,o.kt)("inlineCode",{parentName:"p"},"Crabmarine")," with all the old properties plus the new fuel\ncost property. We can define the previous model of submarine with a constant\n",(0,o.kt)("inlineCode",{parentName:"p"},"fuelCost")," of 1 and name it ",(0,o.kt)("inlineCode",{parentName:"p"},"ConstantCostCrabmarine"),"."),(0,o.kt)("p",null,"The new model ",(0,o.kt)("inlineCode",{parentName:"p"},"IncreasingCostCrabmarine")," used for part 2 has a field\n",(0,o.kt)("inlineCode",{parentName:"p"},"fuelCost"),", which increases with each move."),(0,o.kt)("p",null,"Now we only need to modify the way we calculate the ",(0,o.kt)("inlineCode",{parentName:"p"},"fuelCost")," to actually use our\nnew property."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},"val fuelCostForMax = situation.collect {\n  case crabmarine if crabmarine.horizontal == maxHorizontal.horizontal =>\n    crabmarine.fuelCost\n}.sum\nval fuelCostForMin = situation.collect {\n  case crabmarine if crabmarine.horizontal == minHorizontal.horizontal =>\n    crabmarine.fuelCost\n}.sum\n")),(0,o.kt)("p",null,"That's it, everything else can stays the same!"),(0,o.kt)("h2",{id:"final-code-for-part-2"},"Final code for part 2"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-scala"},'sealed trait Crabmarine:\n  def moveForward(): Crabmarine\n  def moveBackward(): Crabmarine\n  def horizontal: Int\n  def fuelCost: Int\n\ncase class ConstantCostCrabmarine(horizontal: Int) extends Crabmarine:\n  def fuelCost: Int = 1\n  def moveForward(): Crabmarine = this.copy(horizontal = horizontal + 1)\n  def moveBackward(): Crabmarine = this.copy(horizontal = horizontal - 1)\n\ncase class IncreasingCostCrabmarine(horizontal: Int, fuelCost: Int = 1)\n    extends Crabmarine:\n  def moveForward() =\n    this.copy(horizontal = horizontal + 1, fuelCost = fuelCost + 1)\n  def moveBackward() =\n    this.copy(horizontal = horizontal - 1, fuelCost = fuelCost + 1)\n\ncase class Crabmada(crabmarines: List[Crabmarine]):\n\n  require(crabmarines.nonEmpty)\n\n  @tailrec\n  final def align(\n      situation: List[Crabmarine] = crabmarines,\n      fuelCost: Int = 0\n  ): Int =\n    val allTheSame = situation.forall(_.horizontal == situation.head.horizontal)\n    if allTheSame then fuelCost\n    else\n      val maxHorizontal = situation.maxBy(_.horizontal)\n      val minHorizontal = situation.minBy(_.horizontal)\n\n      val fuelCostForMax = situation.collect {\n        case crabmarine if crabmarine.horizontal == maxHorizontal.horizontal =>\n          crabmarine.fuelCost\n      }.sum\n      val fuelCostForMin = situation.collect {\n        case crabmarine if crabmarine.horizontal == minHorizontal.horizontal =>\n          crabmarine.fuelCost\n      }.sum\n      if fuelCostForMax < fuelCostForMin then\n        val updated = situation.map { crabmarine =>\n          if crabmarine.horizontal == maxHorizontal.horizontal then\n            crabmarine.moveBackward()\n          else crabmarine\n        }\n        align(updated, fuelCost + fuelCostForMax)\n      else\n\n        val updated = situation.map { crabmarine =>\n          if crabmarine.horizontal == minHorizontal.horizontal then\n            crabmarine.moveForward()\n          else crabmarine\n        }\n        align(updated, fuelCost + fuelCostForMin)\n      end if\n    end if\n  end align\nend Crabmada\n\n\ndef part2(input: String): Int =\n  val horizontalPositions = input.split(",").map(_.toInt).toList\n  val crabmarines =\n    horizontalPositions.map(horizontal => IncreasingCostCrabmarine(horizontal))\n  Crabmada(crabmarines).align()\n')),(0,o.kt)(r.Z,{puzzle:"day7-part2",year:"2021",mdxType:"Solver"}),(0,o.kt)("h2",{id:"run-it-locally"},"Run it locally"),(0,o.kt)("p",null,"You can get this solution locally by cloning the\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/scalacenter/scala-advent-of-code"},"scalacenter/scala-advent-of-code"),"\nrepository."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ git clone https://github.com/scalacenter/scala-advent-of-code\n$ cd scala-advent-of-code\n")),(0,o.kt)("p",null,"You can run it with ",(0,o.kt)("a",{parentName:"p",href:"https://scala-cli.virtuslab.org/"},"scala-cli"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"$ scala-cli 2021 -M day7.part1\nThe solution is 355150\n\n$ scala-cli 2021 -M day7.part2\nThe solution is 98368490\n")),(0,o.kt)("p",null,"You can replace the content of the ",(0,o.kt)("inlineCode",{parentName:"p"},"input/day7")," file with your own input from\n",(0,o.kt)("a",{parentName:"p",href:"https://adventofcode.com/2021/day/7"},"adventofcode.com")," to get your own\nsolution."),(0,o.kt)("h2",{id:"solutions-from-the-community"},"Solutions from the community"),(0,o.kt)("p",null,"There are most likely some other solutions that we could have used. In\nparticular some advent coders had luck with using median and average for\ndetermining the final horizontal positions of the crabmarines."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/tOverney/AdventOfCode2021/blob/main/src/main/scala/ch/overney/aoc/day7/"},"Solution")," of ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/tOverney"},"@tOverney"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Jannyboy11/AdventOfCode2021/blob/main/src/main/scala/day07/Day07.scala"},"Solution")," of ",(0,o.kt)("a",{parentName:"li",href:"https://twitter.com/JanBoerman95"},"Jan Boerman"),".")),(0,o.kt)("p",null,"Share your solution to the Scala community by editing this page."))}h.isMDXComponent=!0}}]);