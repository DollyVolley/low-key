import { AtomEffect, DefaultValue } from "recoil";

// thanks to https://learnrecoil.com/video/atom-effects-atom-families
export const loadAndPersistCacheEffect: AtomEffect<any> = ({onSet, setSelf, node}) => {
    const storedData = localStorage.getItem(node.key);
    if(storedData != null) {
        setSelf(JSON.parse(storedData));
    }

    onSet((newValue) => {
        if(newValue instanceof DefaultValue || newValue === null) {
            localStorage.removeItem(node.key);
         }  else {
            localStorage.setItem(node.key, JSON.stringify(newValue));
        }
    })
}
