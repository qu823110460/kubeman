const CommonFunctions = require('../../k8s/common')

async function listNamespaces(getClusters, getK8sClients, onOutput) {
  const clusters = getClusters()
  const k8sClients = getK8sClients()
  const output = []
  output.push([
    "Namespace", 
    "Created",
    "Status"
  ])
  for(let i = 0; i < clusters.length; i++) {
    const cluster = clusters[i].name
    output.push(["Cluster: " + cluster, "---", "---"])
    const namespaces = await CommonFunctions.getNamespacesForCluster(cluster, k8sClients[i])
    namespaces.forEach(ns => output.push([ns.name, ns.creationTimestamp, ns.status]))
  }
  onOutput(output, 'Health')
  
}

module.exports = {
  order: 2,
  context: "Cluster",
  actions: [
    {
      order: 1,
      name: "List Namespaces",
      act: listNamespaces,
    },
  ]
}