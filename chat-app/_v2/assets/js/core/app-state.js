export function createAppState({ selectedId, organization }) {
  return {
    selectedId,
    organization,
    tab: 'timeline',
    commandIndex: 0,
    slashMenuDismissed: false,
    activeCommand: null,
    contextOpen: true,
    theme: 'standard',
    aiWorking: false,
    promptKey: 'summary',
  };
}
