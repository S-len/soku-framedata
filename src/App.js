import { ReactComponent as IconFlask } from './icons/flask.svg';
import suika from './data/suika.json'
import alice from './data/alice.json'
import aya from './data/aya.json'
import cirno from './data/cirno.json'
import iku from './data/iku.json'
import komachi from './data/komachi.json'
import marisa from './data/marisa.json'
import meiling from './data/meiling.json'
import patchouli from './data/patchouli.json'
import reimu from './data/reimu.json'
import reisen from './data/reisen.json'
import remilia from './data/remilia.json'
import sakuya from './data/sakuya.json'
import sanae from './data/sanae.json'
import suwako from './data/suwako.json'
import tenshi from './data/tenshi.json'
import utsuho from './data/utsuho.json'
import youmu from './data/youmu.json'
import yukari from './data/yukari.json'
import yuyuko from './data/yuyuko.json'
import React, {useContext, useState} from 'react';

//TODO: Clean up.

const data = [].concat(suika, alice, aya, cirno, iku, komachi, marisa, meiling,
  patchouli, reimu, reisen, remilia, sakuya, sanae, suwako, tenshi, utsuho,
  youmu, yukari, yuyuko)

const FlexRow = ({ children, className }) => (
  <div className={"flex flex-row " + className}>
    {children}
  </div>
)

const FlexCol = ({ children, className }) => (
  <div className={"flex flex-col " + className}>
    {children}
  </div>
)

const HeaderButton = ({ text, onClick }) => (
  <button className="hover:bg-neutral-700 hover:cursor-pointer active:bg-neutral-800 px-2 py-1"
      onClick={onClick}>
    {text}
  </button>
)

const Header = ({buttons, onClick}) => (
  <header className="flex flex-row justify-between items-center h-12 bg-neutral-900 text-white text-xl font-bold border-white border-b-4 shadow-xl px-4">
    <FlexRow className="row gap-1 items-center">
      <IconFlask height="24px" width="24px" fill="currentColor"/>
      <h1 className="text-2xl">
        Soku Framedata
      </h1>
    </FlexRow>
    <FlexRow className="gap-2">
      { buttons.map(buttonText => <HeaderButton text={buttonText} onClick={() => onClick(buttonText)}/>) }
    </FlexRow>
  </header>
)

const minVers = {
  "Damage": "Dmg",
  "Limit": "Lmt",
  "Rate": "Rate",
  "Modifier": "M",
  "Cancel": "Can",
  "Guard": "Grd",
  "Startup": "SU",
  "Active": "A",
  "Total": "T",
  "Frame Adv.": "FA",
  "Density": "Den",
  "Graze": "GR",
  "Motion": "MC",
  "Version": "Ver",
  "Spirit": "SD",

  "H (Crush)": "H*",
  "L (Crush)": "L*",
  "Smash": "S",
  "Rift": "R",
  "Uncharged": "Reg",
  "Charged": "Ch",
  "1st hit": "1hit",
  "2nd hit": "2hit",
}

const minify = (str) =>
  minVers[str]? minVers[str] : str
const normal = (str) => str

const filtered = {
//  "Cancel": true,
//  "Version": true
}

const HoverImg = ({src, loading}) => (
  <img src={src} 
    className="pointer-events-none absolute
      opacity-0 transition-opacity group-hover:opacity-100
      border my-12" 
    loading={loading}/>
)

const StyleContext = React.createContext(false)

// TODO: fix up
const Entry = ({move}) => {
  const minimal = useContext(StyleContext)
  const keyfilter = minimal? minify : normal
  const valfilter = minimal? minify : normal
  return (
    <FlexCol className="w-full border-b last:border-b-0">
      <FlexRow className="gap-2 items-center">
        <FlexCol className="w-32 items-center group">
          <div className="cursor-pointer">{move.char}</div>
          { move.img && 
              (minimal?
                <HoverImg src={move.img} loading="lazy" /> :
                <img src={move.img} loading="lazy" />)
          }
          <div className="cursor-pointer text-center">{move.name}</div>
        </FlexCol>
        <FlexRow className="gap-2 items-center flex-wrap">
        { 
          Object.keys(move.data[0]).filter(key => !filtered[key]).map(key => (
            <FlexCol className="items-center" key={key}>
              <div className="border-b text-center w-full">{keyfilter(key)}</div>
              {move.data.map((version, i) => 
                <div key={version['Version']+" "+i}>{valfilter(version[key])}</div>)}
            </FlexCol>
          ))
        }
        </FlexRow>
      </FlexRow>
    </FlexCol>
  )
}

const Entries = ({results, showfull, limit}) => {
  if(!results || !results.length)
    return <p>No results found</p>

  results = showfull? results : results.slice(0,limit)

  return (
    <FlexCol className="w-full">
      { results.map(move => <Entry move={move} key={move.char + move.name}/>) }
    </FlexCol>
  )
}

const characters = [ "alice", "cirno", "iku", "komachi", "marisa",
  "meiling", "patchouli", "reimu", "reisen", "remilia", "sakuya", "sanae",
  "suika", "suwako", "tenshi", "utsuho", "youmu", "yukari", "yuyuko" ]

const characterData = {
  "alice": alice,
  "cirno": cirno,
  "iku": iku,
  "komachi": komachi,
  "marisa": marisa,
  "meiling": meiling,
  "patchouli": patchouli,
  "reimu": reimu,
  "reisen": reisen,
  "remilia": remilia,
  "sakuya": sakuya,
  "sanae": sanae,
  "suika": suika,
  "suwako": suwako,
  "tenshi": tenshi,
  "utsuho": utsuho,
  "youmu": youmu,
  "yukari": yukari,
  "yuyuko": yuyuko
}

const moveTypes = [ "normal", "bullet", "skill", "spell" ]

const aliases = {
  "chirno": "cirno",
  "koma": "komachi",
  "hong": "meiling",
  "patchy": "patchouli",
  "remi": "remilia",
  "oni": "suika",
  "wako": "suwako",
  "okuu": "utsuho",
  "yoom": "youmu",
  "hag": "yukari",
  "unga": "yuyuko",

  "melee": "normal",
  "spellcard": "spell"
}

const parseSearch = (query) => {
  const searchOpts = {
    characters: [],
    types: [],
    name: '',
    exact: false
  }

  const rest = []

  query.toLowerCase().split(' ').forEach((queryWord) => {
    const aliased = aliases[queryWord]
    if(aliased) queryWord = aliased

    if(characters.includes(queryWord)) {
      searchOpts.characters.push(queryWord)
      return
    }

    if(moveTypes.includes(queryWord)) {
      searchOpts.types.push(queryWord)
      return
    }

    rest.push(queryWord)
  })

  searchOpts.name = rest.join(' ')
  if(searchOpts.name.endsWith('.')) {
    searchOpts.exact = true
    searchOpts.name = searchOpts.name.slice(0, -1)
  }

  if(searchOpts.characters.length === 0)
    searchOpts.characters = characters
  if(searchOpts.types.length === 0)
    searchOpts.types = moveTypes

  return searchOpts
}

const search = (query) => {
  const searchOpts = parseSearch(query)

  let moves = []
  if(searchOpts.characters.length === 20)
    moves = data
  else
    moves = searchOpts.characters.map(char => characterData[char]).flat()

  return moves.filter(move => {
    return searchOpts.types.includes(move.type) &&
      (searchOpts.exact?
        searchOpts.name === move.name.toLowerCase() :
        move.name.toLowerCase().includes(searchOpts.name))
  })
}

const TextButton = ({text, onClick}) => (
  <div className="font-bold cursor-pointer select-none
      hover:text-neutral-400 active:text-neutral-200"
      onClick={onClick}>
    {text}
  </div> 
)

const MAX_RESULTS = 25

const Body = () => {
  const [results, setResults] = useState(data)
  const [query, setQuery] = useState('')
  const [showfull, setShowfull] = useState(false)

  const onSearch = ({target}) => {
    const newQuery = target.value
    const newResults = newQuery? search(newQuery) : data
    setQuery(newQuery)
    setShowfull(newResults.length <= MAX_RESULTS)
    setResults(newResults)
  }

  const onShowfull = () => {
    setShowfull(true)
  }

  return (
    <div className="flex flex-col max-w-7xl w-full items-center self-center bg-neutral-900 
        p-2 pb-5 mb-10 shadow-xl border-b-2 border-white gap-3">
      <h2 className="text-2xl font-bold text-center">Search</h2>
      <input className="bg-transparent w-1/2 border-b border-white px-2 py-1 text-lg mb-5"
        placeholder="Eg: 'Suika 5A', 'remi okuu 5aa.', 'suika spell great oni'..." value={query} onChange={onSearch}/>
      <Entries results={results} showfull={showfull} limit={MAX_RESULTS}/>
      { showfull || <TextButton text="Show full" onClick={onShowfull}/>}
    </div>
  )
}

const GuidePopup = ({active, onClose}) => {
  return active? (
    <div className="flex fixed top-0 left-0 right-0 z-50 w-full h-full p-4 overflow-x-hidden overflow-y-auto
        justify-center content-between items-center backdrop-brightness-50"
        onClick={onClose}>
      <div class="bg-neutral-800 max-w-lg w-full border border-t-4 py-1 px-2 pb-4">
        <h2 className="text-center text-2xl">Guide</h2>
        Things you can search for that might not be apparent:
        <ul className="px-6 list-disc">
          <li>Multiple characters (it shows results from all given characters)</li>
          <li>Move types (normal, bullet, skill, spell)</li>
          <li>Exact search by adding . at the end (useful for stuff like 5A)</li>
          <li>Combinations of everything above.</li>
        </ul>
      </div>
    </div>
  ) : <></>
}

const App = () => {
  const [minimal, setMinimal] = useState(false)
  const [popup, setPopup] = useState(false)

  const onHeaderButton = (button) => {
    if(button === "Minimal")
      setMinimal(true)
    else if(button === "Normal")
      setMinimal(false)
    else if(button === "Guide")
      setPopup(true)
  }

  return (
    <div className="min-h-screen bg-neutral-800 text-white flex flex-col gap-5">
      <StyleContext.Provider value={minimal}>
        <Header buttons={[minimal? "Normal" : "Minimal", "Guide"]} onClick={onHeaderButton}/>
        <Body />
        <GuidePopup active={popup} onClose={() => setPopup(false)}/>
      </StyleContext.Provider>
    </div>
  );
}

export default App;
