import {trace, Tracer} from "@opentelemetry/api";
import {NextFunction, Request, Response} from "express";

const tracer = trace.getTracer("add-request-id")
export default function(req: Request, fn: () => Promise<any>) {
  const params = req.params
  const originalUrl = req.originalUrl
    .split("/")
    .filter((el: string) => {
      return el && !Object.values(params).includes(el)
    })
    .join("_");
  const spanName = originalUrl || "api"
  const _tracer = trace.getTracer(`trace_${spanName}`)
  const span = _tracer.startSpan(`span_${spanName}`)

  if (req.headers["x-request-id"]) {
    span.setAttribute("x-request-id", req.headers["x-request-id"]);
  }

  return fn()
    .finally(() => {
      span.end();
    });
}

export function addXRequestId(req: Request, res: Response, next: NextFunction) {
  if (req.headers["x-request-id"]) {
    const span = tracer.startSpan("add-request-id")
    span.setAttribute("x-request-id", req.headers["x-request-id"]);
    span.end()
  }
  next();
}

