import { GoogleOAuthProvider } from "@react-oauth/google"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import App from "./App"
import { store } from "./redux/store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="366215916511-2uhvh5ruijpr6olcmdgkaqo54gi1m83d.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
)
