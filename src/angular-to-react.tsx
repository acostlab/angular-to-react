/* eslint-disable no-console */
import 'reflect-metadata';
import 'zone.js/dist/zone';
import 'zone.js/dist/zone-error';
import { NgModule, NgModuleRef, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import React from 'react';
import { NgButton2 } from './Button2';

export const SELECTOR = 'app-root';

const bootstrapAngularApp = (
  node: HTMLElement,
  AppComponentInstance: any,
  selector: string,
): Promise<NgModuleRef<any>> => {
  // TODO selector à extraire du composant? Mais on ne peut pas en afficher plusieurs dans ces cas là... c'est un problème...
  // On fait un composant custom à ID unique, qui contient le template?
  node.appendChild(document.createElement(selector));
  const AppModule = NgModule({
    // TODO à importer sur la base de moduleMetadata défini dans le fichier storybook
    declarations: [AppComponentInstance, NgButton2],
    imports: [BrowserModule],
    bootstrap: [AppComponentInstance],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  })(class {});
  return platformBrowserDynamic().bootstrapModule(AppModule);
};

export default (Component: any, selector: string = SELECTOR) => {
  console.log('debugging... trying to display: ', Component);
  return (props: any) => {
    console.log('debugging... Executing function with props', props);
    const el = React.useRef<any>(null);

    React.useEffect(() => {
      console.log('debugging... Executing useEffect with el', el);
      let module: any;
      // eslint-disable-next-line no-return-assign
      bootstrapAngularApp(el.current, Component, selector).then((m) => (module = m));
      // eslint-disable-next-line consistent-return
      return () => {
        while (!module) {
          // eslint-disable-next-line no-continue
          continue;
        }
        console.log('debugging... Destroy.', el);
        module.destroy();
      };
    });
    console.log('debugging... createElement', el);
    return React.createElement('div', { ref: el, className: 'angular-wrapper' });
  };
};
