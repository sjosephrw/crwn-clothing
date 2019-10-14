import { createSelector } from 'reselect';

const selectDirectory = (state) => state.directory;


export const selectDirectorySections = createSelector(
    [selectDirectory],//this could be a array
    directory => directory.sections
);

