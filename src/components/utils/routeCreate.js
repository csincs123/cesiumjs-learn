export async function createFileRoute () {
    const vueFile = import.meta.glob("../../views/examples/*.vue")
    console.log('vueFile', vueFile)
}

export function createRouteJson () {

}