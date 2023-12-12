import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export default function useLanguage() {
    const { getItem: getLang } = useLocalStorage('lang');
    const lang = getLang();
    const [currentLang, setCurrentLang] = useState<string>('en');

    useEffect(() => {
        lang && setCurrentLang(lang);
    }, [lang])

    return { currentLang } as const;
}