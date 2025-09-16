import fr from '../locales/fr';

const translations = {
    fr
};

const currentLang = 'fr';

/**
 * Récupère la chaîne traduite correspondant au chemin fourni dans les fichiers de langue.
 */
export function t(path: string): string {
    const keys = path.split('.');
    let result: any = translations[currentLang];

    for (const key of keys) {
        result = result?.[key];
        if (!result) return path;
    }

    return result;
}
