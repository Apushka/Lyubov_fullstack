import { createSelector } from 'reselect';

const getPortfolioSelector = state => {
    return state.Portfolio.gallery;
}

export const getSortedPortfolio = createSelector(getPortfolioSelector, (gallery) => {
    const sortedGallery = [...gallery];
    sortedGallery.reverse();
    return sortedGallery;
})