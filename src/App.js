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

const data = [].concat(alice, aya, cirno, iku, komachi, marisa, meiling,
  patchouli, reimu, reisen, remilia, sakuya, sanae, suika, suwako, tenshi, utsuho,
  youmu, yukari, yuyuko)

const FlexRow = ({ children, className, ...rest }) => (
  <div className={"flex flex-row " + className} {...rest}>
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
      { buttons.map(buttonText => 
        <HeaderButton text={buttonText} key={buttonText} onClick={() => onClick(buttonText)}/>) }
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
const FilterContext = React.createContext({})

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

const characters = [ "alice", "aya", "cirno", "iku", "komachi", "marisa",
  "meiling", "patchouli", "reimu", "reisen", "remilia", "sakuya", "sanae",
  "suika", "suwako", "tenshi", "utsuho", "youmu", "yukari", "yuyuko" ]

const characterData = {
  "alice": alice,
  "aya": aya,
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

const parseSearch = (query, overrides) => {
  let defaultCharacters = characters 
  let defaultTypes = moveTypes
  if(overrides) {
    if(overrides.characters)
      defaultCharacters = overrides.characters 
    if(overrides.types)
      defaultTypes = overrides.types
  }

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
    searchOpts.characters = defaultCharacters
  if(searchOpts.types.length === 0)
    searchOpts.types = defaultTypes

  return searchOpts
}

const search = (query, overrides) => {
  const searchOpts = parseSearch(query, overrides)

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

const SimpleTextButton = ({text, onClick}) => (
  <div className="font-bold cursor-pointer select-none
      hover:text-neutral-400 active:text-neutral-200"
      onClick={onClick}>
    {text}
  </div> 
)

const MAX_RESULTS = 25

const Body = () => {
  const [query, setQuery] = useState('')
  const [showfull, setShowfull] = useState(false)
  const filter = useContext(FilterContext)

  const results = search(query, filter)

  const onSearch = ({target}) => {
    const newQuery = target.value
    const newResults = search(newQuery, filter)
    setQuery(newQuery)
    setShowfull(newResults.length <= MAX_RESULTS)
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
      { showfull || <SimpleTextButton text="Show full" onClick={onShowfull}/>}
    </div>
  )
}

const GuidePopup = ({active, onClose}) => {
  return active? (
    <div className="flex fixed top-0 left-0 right-0 z-50 w-full h-full p-4 overflow-x-hidden overflow-y-auto
        justify-center content-between items-center backdrop-brightness-50"
        onClick={onClose}>
      <div className="bg-neutral-800 max-w-lg w-full border border-t-4 py-1 px-2 pb-4">
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

const ImgButton = ({src, className, onClick, enabled=true}) => ( 
  <img src={src}
    className={className + " hover:scale-105 active:scale-90 cursor-pointer "
      + (enabled? "" : "brightness-50")}
    onClick={onClick} 
    onDragStart={e => e.preventDefault()}/>
)

const TextButton = ({className, onClick, enabled=true, text}) => (
  <FlexRow className={className + " font-bold justify-center items-center " +
        "border bg-neutral-900 hover:scale-105 active:scale-90 select-none " +
        (enabled? "" : "brightness-50")}
      onClick={onClick}>
    {text}
  </FlexRow>
)

const FilterPopup = ({active, onCharClick, onTypeClick, onSelectAll, onClear}) => {
  const filter = useContext(FilterContext)
  const enabledChars = filter.characters
  const enabledTypes = filter.types
  return (
    <div className={"absolute top-14 right-2 bg-neutral-800 max-w-lg border border-t-4 p-2 pb-3 " + 
        (active? "" : "hidden")}>
      <FlexCol className="align-middle gap-3">
        <div>
          <h3 className="text-xl font-bold text-center pb-1">Characters</h3>
          <FlexRow className="flex-wrap gap-2 justify-center">
            { 
              characters.map(char => 
                <ImgButton src={`./images/portraits/${char}.png`}  key={char}
                    className="w-20"
                    enabled={enabledChars.includes(char)}
                    onClick={() => onCharClick(char)} />)
            }
          </FlexRow>
          <FlexRow className="flex-wrap gap-2 justify-center pt-2">
            <TextButton 
              className="w-20 h-10"
              onClick={onSelectAll}
              text="Select All" />
            <TextButton 
              className="w-20 h-10"
              onClick={onClear}
              text="Clear All" />
          </FlexRow>
        </div>
        <div>
          <h3 className="text-xl font-bold text-center pb-1">Types</h3>
          <FlexRow className="flex-wrap gap-2 justify-center">
            { 
              moveTypes.map(type => 
                <TextButton key={type}
                    className="w-20 h-10"
                    enabled={enabledTypes.includes(type)}
                    onClick={() => onTypeClick(type)}
                    text={type} />)
            }
          </FlexRow>
        </div>
      </FlexCol>
    </div>
  )
}

const typeSort = (type1, type2) => {
  const val1 = moveTypes.indexOf(type1)  
  const val2 = moveTypes.indexOf(type2)  
  return val1 < val2
}

const App = () => {
  const [minimal, setMinimal] = useState(false)
  const [guidePopup, setGuidePopup] = useState(false)
  const [filterPopup, setFilterPopup] = useState(false)

  const [filter, setFilter] = useState({
    characters: characters,
    types: moveTypes
  })

  const onHeaderButton = (button) => {
    if(button === "Minimal")
      setMinimal(true)
    else if(button === "Normal")
      setMinimal(false)
    else if(button === "Filter")
      setFilterPopup(!filterPopup)
    else if(button === "Guide")
      setGuidePopup(true)
  }

  const onCharClick = (clickedChar) => {
    if(filter.characters.includes(clickedChar)) {
      setFilter({
        characters: filter.characters.filter(char => char !== clickedChar),
        types: filter.types
      })
    }
    else {
      setFilter({
        characters: [...filter.characters, clickedChar].sort(),
        types: filter.types
      })
    }
  }

  const onTypeClick = (clickedType) => {
    if(filter.types.includes(clickedType)) {
      setFilter({
        types: filter.types.filter(type => type !== clickedType),
        characters: filter.characters
      })
    }
    else {
      setFilter({
        types: [...filter.types, clickedType].sort(typeSort),
        characters: filter.characters
      })
    }
  }

  const onSelectAll = () => {
    setFilter({
      characters: characters,
      types: filter.types
    })
  }

  const onClear = () => {
    setFilter({
      characters: [],
      types: filter.types
    })
  }

  return (
    <div className="min-h-screen bg-neutral-800 text-white flex flex-col gap-5">
      <StyleContext.Provider value={minimal}>
        <FilterContext.Provider value={filter}>
          <Header buttons={[minimal? "Normal" : "Minimal", "Filter", "Guide"]} onClick={onHeaderButton}/>
          <Body />
          <GuidePopup active={guidePopup} onClose={() => setGuidePopup(false)}/>
          <FilterPopup active={filterPopup} 
            onCharClick={onCharClick} onTypeClick={onTypeClick}
            onSelectAll={onSelectAll} onClear={onClear} />
        </FilterContext.Provider>
      </StyleContext.Provider>
    </div>
  );
}

export default App;
