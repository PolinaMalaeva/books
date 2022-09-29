export const setVisitedId = (id: string) => {
    let ids: string[] = getVisitedIds();

    if (!isVisited(id)) {
        ids.push(id);
        setVisitedInLocalStorage(ids);
    }
}

export const getVisitedIds = () => {
    let visitedBookIds = localStorage.getItem('visitedBookIds');

    return visitedBookIds ? JSON.parse(visitedBookIds) : []
}

export const isVisited = (id: string) => {
    let ids: string[] = getVisitedIds();
    let visited = ids.find(item => item === id);

    return !!visited;
}

export const setVisitedInLocalStorage = (ids: string[]) => {
    localStorage.setItem('visitedBookIds', JSON.stringify(ids));
}