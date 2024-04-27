function getColorByMethod(method: String): string {
    const colorMap: { [key: string]: string } = {
        'POST': '#367BC0',
        'GET': '#184173',
        'PATCH': '#50E3C2',
        'DELETE': '#F93E3E'
    };

    const methodUpperCase = method.toUpperCase();

    if (colorMap.hasOwnProperty(methodUpperCase)) {
        return colorMap[methodUpperCase];
    } else {
        return '#000000'; 
    }
}
export default getColorByMethod