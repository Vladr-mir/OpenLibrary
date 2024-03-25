import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react";
import * as OpenLibrary_backend from "declarations/OpenLibrary_backend";
import { useConnect } from "@connect2ic/react";
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import CreateBook from "./CreateBook";

const Home = () => {
  const {principal} = useConnect();

  function onElementAvailable(selector, callback) {
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        callback();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  onElementAvailable(".ii-styles", () => {
    const btn2 = Array.from(document.getElementsByClassName('ii-styles'));

    const custom_style = {
      "color" : "black",
      "background-color": "white",
      "padding": "3px",
      "margin_left": "4px",
      "border-radius": "3px",
      "border": "2px solid #008CBA"
    }

    Object.assign(btn2[0].style, custom_style);

    const texto = Array.from(document.getElementsByClassName('button-label'));
    if (texto[0])
      texto[0].remove();
      
    const img = Array.from(document.getElementsByClassName('img-styles'));
    img[0].style.height = "25px";
  });


  onElementAvailable(".connect-button", () => {
    const btn = Array.from(document.getElementsByClassName('connect-button'));
    const custom_style = {
      "color" : "black",
      "background-color": "white",
      "padding": "3px",
      "margin_left": "4px",
      "border-radius": "3px",
      "border": "2px solid #008CBA"
    }

    Object.assign(btn[0].style,custom_style);
    if ( btn[0].textContent == 'Connect' || btn[0].textContent == 'Conectar II')
        btn[0].textContent = 'Conectar II' ;
    else
        btn[0].textContent = 'Desconectar II' ;
  });

  return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        { principal ? ( 
            <div className="fluid-container">
                    <Link to='/' className="navbar-brand">Open Library</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#"></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/savebook" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Crear
                            </a>
                        </li>
                    </ul>
                    
                    {/* <span className="fs-6 text">{principal}</span> */}
                    <ConnectButton />
                    <ConnectDialog />
                </div>
                
            </div>
        ) : ( 
            <div className="container-fluid">
            <a className="navbar-brand" href="#">Open Library</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#"></a>
                    </li>
                </ul>
                <ConnectButton />
                <ConnectDialog />
            </div>
        </div>
        )}
    </nav>
    
    </BrowserRouter>
  )
}

const client = createClient({
    canisters: {
      OpenLibrary_backend,
    },
    providers: [
      new InternetIdentity({ providerUrl: "http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/" })
    ],
    globalProviderConfig: {
      /*
       * Disables dev mode in production
       * Should be enabled when using local canisters
       */
      dev: true,
    },
});

export default () => (
  <Connect2ICProvider client={client}>
    <Home />
  </Connect2ICProvider>
)