package pfe.recouvrement.action;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "action")
public class Action {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Action")
    private int idAction;

    @Column(name = "id_Client")
    private int idClient;

    @Column(name = "Type_act")
    private String typeAct;

    @Column(name = "id_user")
    private String idUser;

    @Column(name = "id_etat")
    private int idEtat;

    @Column(name = "dateCreation")
    private Date dateCreation;

    // Getters and Setters (generate these via your IDE)
    public int getIdAction() { return idAction; }
    public void setIdAction(int idAction) { this.idAction = idAction; }

    public int getIdClient() { return idClient; }
    public void setIdClient(int idClient) { this.idClient = idClient; }

    public String getTypeAct() { return typeAct; }
    public void setTypeAct(String typeAct) { this.typeAct = typeAct; }

    public String getIdUser() { return idUser; }
    public void setIdUser(String idUser) { this.idUser = idUser; }

    public Integer getIdEtat() { return idEtat; }
    public void setIdEtat(Integer idEtat) { this.idEtat = idEtat; }

    public Date getDateCreation() { return dateCreation; }
    public void setDateCreation(Date dateCreation) { this.dateCreation = dateCreation; }
}