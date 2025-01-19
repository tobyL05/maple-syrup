
console.log("Content script loaded");




import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatComponent from '../components/ChatComponent';

const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

createRoot(root).render(<ChatComponent />)