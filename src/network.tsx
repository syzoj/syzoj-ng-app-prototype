import React, { Component } from "react";
import * as api from "./interfaces/syzoj.api.d";

const APIContext = React.createContext<INetworkProvider>(null);

// The props that must be passed into a networked component.
export interface INetworkedComponentProps {
  url: string;
  components: { [key: string]: any };
}

// The props that a networked component will receive.
export interface INetworkProp {
  // The network object that handles networking details.
  network: INetwork;
}

// The "network" prop received by a networked component.
export interface INetwork {
  get(url: string): void;
  doAction(action: string, value: any): void;
  getBase(): string;
}

// A provider handles the networking details.
export interface INetworkProvider {
  components: { [url: string]: any };
  get(path: string): void;
  doAction(url: string, action: string, data: any): void;
  base: string;
}

// Provides fetch-based network implementation.
interface APIBaseProps {
  api: string;
}
export class APIBase extends Component<APIBaseProps, any>
  implements INetworkProvider {
  components: { [key: string]: any };
  base: string;
  constructor(props: APIBaseProps) {
    super(props);
    this.components = {};
    this.base = props.api;
  }
  render() {
    return (
      <APIContext.Provider value={this}>
        {this.props.children}
      </APIContext.Provider>
    );
  }
  get(path: string) {
    fetch(this.props.api + path, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json"
      }
    })
      .then(resp => resp.json() as Promise<api.Response>)
      .then(resp => this.handleResponse(resp))
      .catch(err => this.handleNetworkError(err));
  }
  handleNetworkError(err: any) {
    console.log(err);
  }
  handleResponse(resp: api.Response) {
    console.log(resp);
    if (resp.mutations)
      resp.mutations.forEach(mut => {
        this.components[mut.path]["N_" + mut.method](mut.value);
      });
  }
  doAction(url: string, action: string, data: any) {
    const u = this.props.api + url + "/" + action;
    fetch(u, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json() as Promise<api.Response>)
      .then(resp => this.handleResponse(resp))
      .catch(err => this.handleNetworkError(err));
  }
}

export function withNetwork<T extends INetworkedComponentProps>(
  WrappedComponent: React.ComponentType<T & { network: INetwork }>
): React.ComponentType<T> {
  return class extends Component<T, any> implements INetwork {
    static contextType = APIContext;
    context!: React.ContextType<typeof APIContext>;
    setRef(ref: React.ComponentType<T & { network: INetwork }>): void {
      if (ref == null) {
        delete this.context.components[this.props.url];
      } else {
        if (this.context.components[this.props.url])
          throw "Duplicate component url: " + this.props.url;
        this.context.components[this.props.url] = ref;
        console.log("addComponent", this.props.url);
      }
    }
    componentDidUpdate(prevProps: T) {
      if (prevProps.url != this.props.url) {
        console.log(prevProps, this.props);
        throw "Component's url changed";
      }
    }
    doAction(action: string, data: any) {
      return this.context.doAction(this.props.url, action, data);
    }
    get(path: any) {
      return this.context.get(path);
    }
    getBase() {
      return this.context.base;
    }
    render() {
      return (
        <WrappedComponent
          ref={(ref: React.ComponentType<T & { network: INetwork }>) =>
            this.setRef(ref)
          }
          network={this}
          {...this.props}
        />
      );
    }
  };
}
