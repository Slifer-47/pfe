package pfe.recouvrement.action;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ActionRepository extends JpaRepository<Action, Integer> {

    @Query("SELECT COUNT(a.idAction) FROM Action a WHERE a.idEtat = :stateId")
    Long countByState(@Param("stateId") int stateId);

    @Query("SELECT COUNT(DISTINCT a.idClient) FROM Action a")
    Long countDistinctClients();
}