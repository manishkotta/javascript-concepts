
export function getTranslationDataForPage(locData, pageName) {
  // console.log("getTranslationDataForPage", pageName);
  let data = locData.data ? locData.data[pageName] : {}
  return {
    isRtl: locData.isRtl ? locData.isRtl : false,
    dir: locData.dir,
    t: (key, str) => {
      if (!data)
        return str;
      return data[key] ? data[key] : str
    }
  };
}
