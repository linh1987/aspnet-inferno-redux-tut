import "babel-polyfill";
import { initWidgetManager } from './widgets';
import windowAvailable from './utils/windowAvailable';

var widgetManager = initWidgetManager(windowAvailable);
