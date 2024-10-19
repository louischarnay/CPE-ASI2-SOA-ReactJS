package com.cpe.cardgenerator.message;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class MessageStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imageURL;
    @Column(length = 5000)
    private String desc;
    private String props;
    private boolean imageReceived;
    private boolean descReceived;
    private boolean propsReceived;

    public boolean isMessageComplete() {
        return imageReceived && descReceived && propsReceived;
    }
}
