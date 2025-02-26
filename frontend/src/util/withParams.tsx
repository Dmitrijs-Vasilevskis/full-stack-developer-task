import { ComponentType } from "react";
import { Params, useParams } from "react-router-dom";

export function withParams<T extends object>(
  Component: ComponentType<T & { params: Params }>
) {
  return function (props: T) {
    return <Component {...props} params={useParams()} />;
  };
}
