def mod(a,b):
    r=a-b
    if r<b:
        return r
    else:
        return mod(b,r)

print(mod(5,3))    
