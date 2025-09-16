declare module 'html-react-parser' {
  import { ReactNode } from 'react';

  /**
   * Analyse une chaîne HTML et renvoie les nœuds React correspondants.
   */
  export default function parse(html: string): ReactNode;
}
