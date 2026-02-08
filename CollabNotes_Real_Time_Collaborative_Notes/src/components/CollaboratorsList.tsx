import { useQuery } from '@tanstack/react-query';
import { useCollaboratorStore } from '../stores/collaboratorStore';
import { fetchCollaboratorsFromAPI } from '../api/apiClient';
import { useEffect } from 'react';

export function CollaboratorsList() {
  const setCollaborators = useCollaboratorStore((s) => s.setCollaborators);
  const collaborators = useCollaboratorStore((s) => s.collaborators);

  const { isLoading, data: fetchedCollaborators } = useQuery({
    queryKey: ['collaborators'],
    queryFn: fetchCollaboratorsFromAPI,
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (fetchedCollaborators) {
      setCollaborators(fetchedCollaborators);
    }
  }, [fetchedCollaborators, setCollaborators]);

  if (isLoading) return <div>Loading collaborators...</div>;

  return (
    <div className="collaborators-container">
      <h2>Collaborators</h2>
      <ul className="collaborators-list">
        {collaborators.map((collab) => (
          <li key={collab.id} className="collaborator-item">
            <strong>{collab.name}</strong>
            <p>{collab.email}</p>
            {collab.lastSeen && (
              <small>
                Last seen: {new Date(collab.lastSeen).toLocaleTimeString()}
              </small>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
