

export class Node {

    constructor (c: string) {

        this.content = c;
        this.childs = [];
    }
    
    public content: string;
    public childs: Array<Node>;

    addWord(word: string): void {

        if (word && word.length > 0) {

            let c = word.charAt(0);
            let rest = word.slice(1);
            let existing = this.childs.find(ch => ch.content === c);

            if (!!existing) {
                existing.addWord(rest);   
            } else {
                let newChild = new Node(c);
                newChild.addWord(rest);
                this.childs.push(newChild);
            }
        }
    }

    getChilds(): Array<string> {
        if (this.childs && this.childs.length > 0) {

            let results: Array<string> = [];

            this.childs.forEach(child => {

                let raw = child.getChilds();

                raw.forEach(r => {
                    results.push(child.content + r);
                });
                
            });

            return results;
        }

        if (this.childs && this.childs.length === 0) {
           return [this.content]; 
        }

        return []
    }

    getNode(start: string): Node| null {

        if (start && start.length > 0) {

            if (start.length === 1) {
                let node = this.childs.find(c => c.content === start);

                if (node) {
                    return node;
                }
            } else {
                let ch = start.charAt(0);
                let rest = start.slice(1);
                let node = this.childs.find(c => c.content === ch);

                if (node) {
                    return node.getNode(rest);
                }
            }
            
        }

        return null;
    }
}


export class AutoComplete {

    constructor () {

        this.root = new Node('root')
    }
    
    public root: Node;


    

    public addDictionary(words: Array<string>): Node {

        let lcWords: Array<string> = [];

        words.forEach(word => {

            lcWords.push(word.toLowerCase());
        });

        lcWords.forEach(word => {

            if (word && word.length > 0) {
                this.root.addWord(word);
            }
        });

        return this.root;
    }

    public getDictionary(): Array<string> {
        return this.root.getChilds();
    }


    public getList(start: string): Array<string> {
        

        let node = this.root.getNode(start);

        if (node) {
            
            let result: Array<string> = []
            let raw = node.getChilds();

            raw.forEach(element => {
                
                result.push(start + element);
            });

            return result;
        }

        return [];
    }




}


