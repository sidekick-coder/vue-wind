export function useBasename(path: string){
    const args = path.split('/')
    
    const last = args[args.length - 1]

    return last
}