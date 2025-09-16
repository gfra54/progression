declare module 'html-react-parser' {
  import { ReactNode } from 'react';

  /**
   * Analyse une chaîne HTML et renvoie les noeuds React correspondants.
   */
  export default function parse(html: string): ReactNode;
}
