package pfe.recouvrement.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {
    ACTIVATE_ACCOUNT("activate_Account");
    private final String name;

    EmailTemplateName(String name) {
        this.name = name;
    }
}
