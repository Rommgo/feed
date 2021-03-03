const helpFunctions = {
    getActiveLinkFromUrl: () => {
        const pathArr = document.location.pathname.split("/");
        return pathArr[1];
    },
    getParamIdFromUrl: () => {
        const pathArr = document.location.pathname.split("/");
        return pathArr[2];
    },
}

export default helpFunctions;
