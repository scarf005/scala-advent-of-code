"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2402],{8452:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>p});var a=e(7462),i=(e(7294),e(3905));e(6340);const s={},o="Day 8: Haunted Wasteland",r={unversionedId:"2023/puzzles/day08",id:"2023/puzzles/day08",title:"Day 8: Haunted Wasteland",description:"by @prinsniels",source:"@site/target/mdoc/2023/puzzles/day08.md",sourceDirName:"2023/puzzles",slug:"/2023/puzzles/day08",permalink:"/scala-advent-of-code/2023/puzzles/day08",draft:!1,editUrl:"https://github.com/scalacenter/scala-advent-of-code/edit/website/docs/2023/puzzles/day08.md",tags:[],version:"current",frontMatter:{},sidebar:"adventOfCodeSidebar",previous:{title:"Day 7: Camel Cards",permalink:"/scala-advent-of-code/2023/puzzles/day07"},next:{title:"Day 9: Mirage Maintenance",permalink:"/scala-advent-of-code/2023/puzzles/day09"}},l={},p=[{value:"Puzzle description",id:"puzzle-description",level:2},{value:"Initial setup",id:"initial-setup",level:2},{value:"Part one solution",id:"part-one-solution",level:2},{value:"Part two solution",id:"part-two-solution",level:2},{value:"final code",id:"final-code",level:2},{value:"Solutions from the community",id:"solutions-from-the-community",level:2}],c={toc:p};function u(t){let{components:n,...e}=t;return(0,i.kt)("wrapper",(0,a.Z)({},c,e,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"day-8-haunted-wasteland"},"Day 8: Haunted Wasteland"),(0,i.kt)("p",null,"by ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/prinsniels"},"@prinsniels")),(0,i.kt)("h2",{id:"puzzle-description"},"Puzzle description"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://adventofcode.com/2023/day/8"},"https://adventofcode.com/2023/day/8")),(0,i.kt)("h2",{id:"initial-setup"},"Initial setup"),(0,i.kt)("p",null,"In its most basic form, we are required to count the number of instructions to follow on a network to reach a desired state. In the example given, we start at ",(0,i.kt)("inlineCode",{parentName:"p"},"AAA")," and are required to reach ",(0,i.kt)("inlineCode",{parentName:"p"},"ZZZ"),". To model this problem I have done the following;"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'/** Describes the Node we are at */\ntype State = String\n\n/**\n * Describes how to get from a Starting State\n * to a New State, given an instruction\n */\ntype Transition = (State, Instr) => State\n\n/** The possible instructions given */\nenum Instr:\n  case GoLeft, GoRight\n\n/**\n * The puzzle describes that the input instructions are infinite,\n * meaning that if there a no instructions left, we start with\n * the first instruction again. To model this I have used\n * a `LazyList[Instr]`. This allows for an infinite stream\n * of instructions.\n */\nobject Instr:\n  def parse(inp: String): LazyList[Instr] =\n    inp\n      .map {\n        case \'L\' => Instr.GoLeft\n        case \'R\' => Instr.GoRight\n      }\n      .to(LazyList) #::: Instr.parse(inp)\n\n/**\n * convert a List of strings (e.g. `"AAA = (BBB, CCC)"`)\n * to a map of entries, (e.g. `"AAA" -> Vector("BBB", "CCC")`)\n */\ndef parseNetwork(inp: List[String]): Map[String, Vector[String]] =\n  inp.map {\n    case s"$a = ($b, $c)" => (a -> Vector(b, c))\n  }.toMap\n\n/**\n * Count function.\n * Check if the predicate is met.\n * If true, return the number of steps taken,\n * if false transition into the next state from the current state,\n * given the first instruction.\n */\n@tailrec\ndef countStepsUntil(\n    state: State, instrs: LazyList[Instr], trans: Transition,\n    count: Int, pred: State => Boolean): Int =\n  if pred(state) then count\n  else\n    countStepsUntil(\n      trans(state, instrs.head), instrs.tail, trans, count + 1, pred)\n')),(0,i.kt)("h2",{id:"part-one-solution"},"Part one solution"),(0,i.kt)("p",null,"Part one simply asks to count the number of steps taken to reach a desired state. To model this we need to define the predicate and transition function.\nThe transition function needs to know the network it is operating on. To be a bit more flexible I decided to create a function that returns the transition function based on a given network."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},"def transitions(network: Map[String, Vector[String]]): Transition =\n  (n, d) =>\n    d match\n      case Instr.GoLeft  => network(n)(0)\n      case Instr.GoRight => network(n)(1)\n")),(0,i.kt)("p",null,"For the predicate tell the function to stop when ",(0,i.kt)("inlineCode",{parentName:"p"},'STATE == "ZZZ"')),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'def part1(input: String): Int =\n  val inpL         = input.split("\\n\\n")\n  val instructions = Instr.parse(inpL.head)\n  val network      = parseNetwork(inpL.tail.head.split("\\n").toList)\n  val trans        = transitions(network)\n\n  countStepsUntil("AAA", instructions, trans, 0, _ == "ZZZ")\n')),(0,i.kt)("h2",{id:"part-two-solution"},"Part two solution"),(0,i.kt)("p",null,"The second part is a bit trickier. We are required to find the number of steps to take, until all nodes in the state end with a ",(0,i.kt)("inlineCode",{parentName:"p"},"Z"),". One can try to brute force this, by changing the transition function to ",(0,i.kt)("inlineCode",{parentName:"p"},"(Set[String], Instr) => Set[String]")," but this takes way to much processing time.\nKey insight comes from the realization that all ",(0,i.kt)("inlineCode",{parentName:"p"},"states")," in the starting ",(0,i.kt)("inlineCode",{parentName:"p"},"Set[Sate]")," move on their own independent path and keep repeating themselves. By knowing this we can use an LCM to get to the correct answer."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'def part2(input: String): Long =\n  // ... reuse parsing from part 1\n  def lcm(a: Long, b: Long): Long =\n    a * b / gcd(a, b)\n\n  def gcd(a: Long, b: Long): Long =\n    if b == 0 then a else gcd(b, a % b)\n\n  // get all the starting states\n  val starts: Set[State] = network.keySet.filter(_.endsWith("A"))\n\n  starts\n    .map(state =>\n      // for each state find the cycle time\n      countStepsUntil(\n        state, instructions, trans, 0, _.endsWith("Z")).toLong)\n    .reduce(lcm)\n')),(0,i.kt)("h2",{id:"final-code"},"final code"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-scala"},'import scala.annotation.tailrec\n\ntype State = String\n\ntype Transition = (State, Instr) => State\n\nenum Instr:\n  case GoLeft, GoRight\n\nobject Instr:\n  def parse(inp: String): LazyList[Instr] =\n    inp\n      .map {\n        case \'L\' => Instr.GoLeft\n        case \'R\' => Instr.GoRight\n      }\n      .to(LazyList) #::: Instr.parse(inp)\n\ndef parseNetwork(inp: List[String]): Map[String, Vector[String]] =\n  inp.map {\n    case s"$a = ($b, $c)" => (a -> Vector(b, c))\n  }.toMap\n\ndef transitions(network: Map[String, Vector[String]]): Transition =\n  (n, d) =>\n    d match\n      case Instr.GoLeft  => network(n)(0)\n      case Instr.GoRight => network(n)(1)\n\n@tailrec\ndef countStepsUntil(\n    state: State, instrs: LazyList[Instr], trans: Transition,\n    count: Int, pred: State => Boolean): Int =\n  if pred(state) then count\n  else\n    countStepsUntil(\n      trans(state, instrs.head), instrs.tail, trans, count + 1, pred)\n\ndef part1(input: String): Int =\n  val inpL         = input.split("\\n\\n")\n  val instructions = Instr.parse(inpL.head)\n  val network      = parseNetwork(inpL.tail.head.split("\\n").toList)\n  val trans        = transitions(network)\n\n  countStepsUntil("AAA", instructions, trans, 0, _ == "ZZZ")\n\ndef part2(input: String): Long =\n  val inpL         = input.split("\\n\\n")\n  val instructions = Instr.parse(inpL.head)\n  val network      = parseNetwork(inpL.tail.head.split("\\n").toList)\n  val trans        = transitions(network)\n\n  val starts: Set[State] = network.keySet.filter(_.endsWith("A"))\n\n  def lcm(a: Long, b: Long): Long =\n    a * b / gcd(a, b)\n\n  def gcd(a: Long, b: Long): Long =\n    if b == 0 then a else gcd(b, a % b)\n\n  starts\n    .map(state =>\n      countStepsUntil(\n        state, instructions, trans, 0, _.endsWith("Z")).toLong)\n    .reduce(lcm)\n')),(0,i.kt)("h2",{id:"solutions-from-the-community"},"Solutions from the community"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/lenguyenthanh/aoc-2023/blob/main/Day08.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/lenguyenthanh"},"Thanh Le")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/GrigoriiBerezin/advent_code_2023/tree/master/task08/src/main/scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/GrigoriiBerezin"},"g.berezin")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/xRuiAlves/advent-of-code-2023/blob/main/Day8.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/xRuiAlves/"},"Rui Alves")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/alexandru/advent-of-code/blob/main/scala3/2023/src/main/scala/day8.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/alexandru/"},"Alexandru Nedelcu")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/bishabosha/advent-of-code-2023/blob/main/2023-day08.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/bishabosha"},"Jamie Thompson")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/Philippus/adventofcode/blob/main/src/main/scala/adventofcode2023/Day08.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/philippus"},"Philippus Baalman")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/prinsniels/AdventOfCode2023/blob/main/src/main/scala/solutions/day08.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/prinsniels"},"Niels Prins")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/jnclt/adventofcode2023/blob/main/day08/haunted-wasteland.sc"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/jnclt"},"jnclt")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/guycastle/advent_of_code_2023/blob/main/src/main/scala/days/day08/DayEight.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/guycastle/"},"Guillaume Vandecasteele")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/marconilanna/advent-of-code/blob/master/2023/Day08.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/marconilanna"},"Marconi Lanna")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/nryabykh/aoc2023/blob/master/src/main/scala/aoc2023/Day08.scala"},"Solution")," by ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/nryabykh"},"Nikolai Riabykh"))),(0,i.kt)("p",null,"Share your solution to the Scala community by editing this page.\nYou can even write the whole article! ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/scalacenter/scala-advent-of-code/discussions/424"},"See here for the expected format")))}u.isMDXComponent=!0}}]);