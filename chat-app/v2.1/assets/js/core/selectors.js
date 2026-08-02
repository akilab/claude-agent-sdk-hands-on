export function createSelectors({ analysts, currentUser, environments, investigations, state }) {
  const selected = () => investigations.find((item) => item.id === state.selectedId);
  const environmentFor = (item) => environments.find((environment) => environment.id === item.environmentId);
  const organizations = () => [...new Set(environments.map((environment) => environment.organization))];
  const environmentsForOrganization = (organization = state.organization) => environments.filter((environment) => environment.organization === organization);
  const organizationFor = (item) => environmentFor(item)?.organization;
  const analystFor = (name) => analysts.find((analyst) => analyst.name === name)
    || { id: `usr-${name}`, name, initials: name.slice(0, 1) };
  const leadAnalystFor = (item) => item.leadAnalyst || analystFor(item.createdBy);
  const initialsFor = (name) => analystFor(name).initials;
  const canEdit = (item = selected()) => item?.lifecycle === 'active' && leadAnalystFor(item).id === currentUser.id;
  const allEvidence = (item = selected()) => item?.evidence || [];
  const evidenceById = (id, item = selected()) => allEvidence(item).find((evidence) => evidence.id === id);

  return {
    selected,
    environmentFor,
    organizations,
    environmentsForOrganization,
    organizationFor,
    analystFor,
    leadAnalystFor,
    initialsFor,
    canEdit,
    allEvidence,
    evidenceById,
  };
}
