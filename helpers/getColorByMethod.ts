function getColorByMethod(method: String): string {
    let color: string;
if (method === undefined) {
        return '#000000';
    }
    switch (method.toUpperCase()) {
        case 'POST':
            color = '#367BC0';
            break;
        case 'GET':
            color = '#184173';
            break;
        case 'PATCH':
            color = '#50E3C2';
            break;
        case 'DELETE':
            color = '#F93E3E';
            break;
        default:
            color = '#000000';
            break;
    }

    return color;
}

export default getColorByMethod