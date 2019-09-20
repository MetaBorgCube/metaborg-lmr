# Statix Specification of LMR

LMR is a simple Language with Modules and Records.
A curiosity of LMR is that imports affect the scope in which they are themselves resolved.
Another language in which this occurs (the only one we know of) is Rust.

The goal of this specification is to illustrate the incompleteness of the Statix operational semantics.
That is: this semantics is exactly the kind of scoping that Statix cannot resolve, because
it requires a fixedpoint semantics for name resolution.

```
module A {
  module A {
    def x = 5
  }
}
module C {
  import A // already ambigous!
}
```
