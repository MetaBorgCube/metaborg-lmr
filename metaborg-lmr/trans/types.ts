module types

imports src-gen/signatures/LMR-sig 

type rules

  TXInt() : TInt()
  TXBool() : TBool()
  TXArrow(t1, t2) : TArrow(ts1, ts2)
    where t1 : ts1 and t2 : ts2
  TXRec(e) : t
    where e : t

  ModUnqualRef(ModRefId(name)) : t
    where definition of name : t
    
  ModQualRef(ref, ModRefId(name)) : t
    where definition of name : t
      
  VarUnqualRef(name) : t
    where definition of name : t
    
  FldAccess(ref, name) : t
    where definition of name : t
    
  New(tref, bnds) : t
    where tref : t
  
  FldBind(name, e) :- 
    where definition of name : t1
      and e : t2
      and t1 == t2
          else error "type mismatch" on e
    
  TypeUnqualRef(name) : t
    where definition of name : t
    
  TypeQualRef(e, name) : t
    where definition of name : t
    
  Fun(arg, e) : TArrow(t1, t2)
    where arg : t1
      and e : t2
  
  Int(i) : TInt()
  
  False() : TBool()
  True() : TBool()
  
  Add(e1, e2) : TInt()
    where e1 : TInt()
      and e2 : TInt()    
  
  App(e1, e2) : t2
    where e1 : TArrow(t1, t2)
          else error "not a function" on e1
      and e2 : t3
      and t1 == t3 else error "arg mismatch" on e2
   
  ArgDecl(name,  ty) : t
    where ty : t
   