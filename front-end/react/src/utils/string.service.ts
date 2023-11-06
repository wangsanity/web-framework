export class StringService {
  static markDownToHTML(data: string): string[] {
    const arr = data.split('\n');
    const newArr: string[] = [];
    const codeBlocksIndexs: number[] = [];
    const titleStyles = 'margin-bottom:15px;margin-top:10px';
    const codeBlockStyles = 'padding:10px;border-radius:4px;background-color:#eee;border:solid 1px #ddd;margin:15px 0;';
    arr.forEach((item: string, index: number) => {
      if (item.startsWith('# ')) {
        newArr.push(`<h1 style=${titleStyles}>${item.replace('# ', '')}</h1>`);
      } else if (item.startsWith('## ')) {
        newArr.push(`<h2 style=${titleStyles}>${item.replace('## ', '')}</h2>`);
      } else if (item.startsWith('### ')) {
        newArr.push(`<h3 style=${titleStyles}>${item.replace('### ', '')}</h3>`);
      } else if (item.startsWith('```')) {
        codeBlocksIndexs.push(index);
        newArr.push(``);
      } else {
        newArr.push(`<p>${item}</p>`)
      }
    });

    const handleCodeBlock = (blockIndexes: number[], markDownData: string[]): any => {
      const data: string[] = [...markDownData];
      let indexes: number[] = [...blockIndexes];
      if (indexes[0] !== undefined && indexes[1]) {
        const codeBlock = data.splice(indexes[0] + 1, indexes[1] - indexes[0]).slice(0, indexes[1] - indexes[0] - 1).join('');
        data[indexes[0]] = `<div style="${codeBlockStyles}">${codeBlock}</div>`;
        indexes = indexes.map((item: number) => item - (indexes[1] - indexes[0]));
        indexes.splice(0, 2);
      }

      if (indexes[0] !== undefined && indexes[1]) {
        return handleCodeBlock(indexes, data);
      } else {
        return data;
      }
    };

    return handleCodeBlock(codeBlocksIndexs, newArr);
  }
}
