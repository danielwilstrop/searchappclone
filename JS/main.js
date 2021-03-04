import { clearSearchText, setSearchFocus, showClearTextButton, clearPushListener } from './searchBar.js'
import { getSearchTerm, retrieveSearchResults } from './dataFuntions.js'
import { buildSearchResults, clearStatsLine, deleteSearchResults, setStatsLine } from './searchResults.js'

document.addEventListener('readystatechange', (e) => {
    if (e.target.readyState === 'complete') {
        initApp()
    }
})

const initApp = () => {
    setSearchFocus()
    const search = document.getElementById('search')
    search.addEventListener('input', showClearTextButton)
    const clear = document.getElementById('clear')
    clear.addEventListener('click', clearSearchText)
    clear.addEventListener('keydown', clearPushListener) 

    const form = document.getElementById('searchBar')
        form.addEventListener('submit', submitSearch)
}

const submitSearch = (e) => {
    e.preventDefault()
    deleteSearchResults()
    processSearch()
    setSearchFocus() 
}

const processSearch = async () => {
    clearStatsLine()
    const searchTerm = getSearchTerm()
        if (!searchTerm) return;

    const resultArray = await retrieveSearchResults(searchTerm)
        if (resultArray.length) buildSearchResults(resultArray)
    setStatsLine(resultArray.length)
}